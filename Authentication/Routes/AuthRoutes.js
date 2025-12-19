const express = require("express");
const { CreateAccount, Login, forgotPassword } = require("../Controller/AuthController");
const AuthRouter = express.Router();

AuthRouter.post("/create-account", CreateAccount);
AuthRouter.post("/login", Login);
AuthRouter.post("/forgot-password", forgotPassword);

module.exports = AuthRouter