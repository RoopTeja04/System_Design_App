const UserModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "MY_SUPER_SECRET_KEY";

exports.CreateAccount = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const findUser = await UserModel.findOne({ email });

    if (findUser)
      return res.status(401).json({
        message: "Already Registered",
      });

    const hashpasword = await bcrypt.hash(password, 10);

    const createdAccount = await UserModel.create({
      name,
      email,
      password: hashpasword,
    });

    const Token = jwt.sign(
      {
        user_Id: createdAccount._id,
        email_id: email.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "User Created Successfully",
      Token,
      userID: createdAccount._id
    });
  } catch (err) {
    res.status(500).json({ message: "Server Down" });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findEmail = await UserModel.findOne({ email });

    if (!findEmail) {
      return res.status(401).json({ message: "User Not Founded" });
    }

    const comparePassword = await bcrypt.compare(password, findEmail.password);

    if (!comparePassword)
      return res.status(401).json({ message: "Invalid Password" });

    const Token = jwt.sign(
      {
        user_Id: findEmail._id,
        email_id: findEmail.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Login Successfull",
      Token,
      userID: findEmail._id
    });
  } catch (err) {
    res.status(500).json({ message: "Server Down" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res
        .status(401)
        .json({ message: "Password Not matched. Check once" });
    }

    const findEmail = await UserModel.findOne({ email });
    if (!findEmail) {
      return res
        .status(404)
        .json({ message: "User Not Founded. check you email once" });
    }

    const hashpasword = await bcrypt.hash(newPassword, 10);

    await UserModel.findOneAndUpdate({ email }, { password: hashpasword });

    return res.status(200).json({ message: "Password Changed Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Down" });
  }
};

exports.ValidateUserperRequest = async (req, res) => {
  try {
    const { userID } = req.params;

    const FindedUser = await UserModel.findById(userID);

    if (!FindedUser) {
      return res.status(404).json({ message: "User Not Validated" })
    }

    return res.status(200).json({ message: "Good To Go", FindedUser })
  } catch (err) {
    res.status(500).json({ message: "Server Down" });
  }
}

var a = 10 