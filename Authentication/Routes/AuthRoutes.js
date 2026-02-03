const express = require('express');
const {
    CreateAccount,
    Login,
    forgotPassword,
    ValidateUserperRequest,
} = require('../Controller/AuthController');

const { verifyToken, RateLimit } = require("../MiddleWare/Middleware");
const AuthRouter = express.Router();

AuthRouter.post('/create-account', RateLimit, CreateAccount);
AuthRouter.post('/login', RateLimit, Login);
AuthRouter.post('/forgot-password', RateLimit, forgotPassword);
AuthRouter.get('/validate-user/:userID', verifyToken, ValidateUserperRequest);

module.exports = AuthRouter;
