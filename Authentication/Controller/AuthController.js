const UserModel = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.CreateAccount = async (req, res) => {
    const data = req.body;

    if (!data.email || !data.password || !data.name) {
        return res.status(400).json({
            message: 'Fill all the fields to create account',
        });
    }

    try {
        const findUser = await UserModel.findOne({ email: data.email });

        if (findUser)
            return res.status(409).json({
                message: 'Already Registered',
            });

        const hashpasword = await bcrypt.hash(data.password, 10);

        const createdAccount = await UserModel.create({
            name: data.name,
            email: data.email,
            password: hashpasword,
        });

        const Token = jwt.sign(
            {
                user_Id: createdAccount._id,
                email_id: createdAccount.email,
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'User Created Successfully',
            Token,
            userID: createdAccount._id,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Down' });
    }
};

exports.Login = async (req, res) => {
    const data = req.body;

    if (!data.email || !data.password) {
        return res.status(400).json({
            message: 'Fill all the fields to create account',
        });
    }

    try {
        const findEmail = await UserModel.findOne({ email: data.email });

        if (!findEmail) {
            return res.status(401).json({ message: 'User Not Found' });
        }

        const comparePassword = await bcrypt.compare(
            data.password,
            findEmail.password
        );

        if (!comparePassword)
            return res.status(401).json({ message: 'Invalid Password' });

        const Token = jwt.sign(
            {
                user_Id: findEmail._id,
                email_id: findEmail.email,
            },
            JWT_SECRET,
            {
                expiresIn: '1h',
            }
        );

        return res.status(200).json({
            message: 'Login Successfull',
            Token,
            userID: findEmail._id,
            isDeactived: findEmail.isDeactived,
            deactiveUntill: findEmail.deactiveUntill,
            deactivateReason: findEmail.deactivateReason,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Down' });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const data = req.body;

        if (data.newPassword !== data.confirmPassword) {
            return res.status(401).json({
                error: {
                    code: 'PASSWORD_MISMATCH',
                    message: 'Password Not matched. Check once',
                },
            });
        }

        const findEmail = await UserModel.findOne({ email: data.email });
        if (!findEmail) {
            return res
                .status(404)
                .json({ message: 'User Not Founded. check you email once' });
        }

        const hashpasword = await bcrypt.hash(data.newPassword, 10);

        await UserModel.findOneAndUpdate(
            { email: data.email },
            { password: hashpasword }
        );

        return res
            .status(200)
            .json({ message: 'Password Changed Successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server Down' });
    }
};

exports.ValidateUserperRequest = async (req, res) => {
    try {
        const { userID } = req.params;

        const FindedUser = await UserModel.findById(userID);

        if (!FindedUser) {
            return res.status(404).json({ message: 'User Not Validated' });
        }

        return res.status(200).json({ message: 'Profile Founded', FindedUser });
    } catch (err) {
        res.status(500).json({ message: 'Server Down' });
    }
};
