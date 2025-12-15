const UserModel = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.CreateAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await UserModel.findOne({ email });

    if (findUser)
      return res.status(401).json({
        message: "Already Registered",
      });

    const hashpasword = await bcrypt.hash(password, 10);

    const createdAccount = await UserModel.create({
      email,
      password: hashpasword,
    });

    return res.status(200).json({
      message: "User Created Successfully",
      createdAccount,
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

    const JWT_SECRET = "MY_SUPER_SECRET_KEY";

    const Token = jwt.sign(
      {
        user_Id: findEmail._id,
        email_id: findEmail.email
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(200)
      .json({
        message: "Login Successfull",
        Token
      });
  } catch (err) {
    res.status(500).json({ message: "Server Down" });
  }
};
