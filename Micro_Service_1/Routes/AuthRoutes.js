const express = require("express");
const { CreateAccount, Login } = require("../Controller/AuthController");
const AuthRouter = express.Router();

AuthRouter.post("/create-account", CreateAccount);
AuthRouter.post("/login", Login);

module.exports = AuthRouter