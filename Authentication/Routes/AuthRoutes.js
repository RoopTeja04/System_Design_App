const express = require("express");
const { CreateAccount, Login, forgotPassword, ValidateUserperRequest } = require("../Controller/AuthController");
const AuthRouter = express.Router();

AuthRouter.post("/create-account", CreateAccount);
AuthRouter.post("/login", Login);
AuthRouter.post("/forgot-password", forgotPassword);
AuthRouter.get("/validate-user/:userID", ValidateUserperRequest);

module.exports = AuthRouter;