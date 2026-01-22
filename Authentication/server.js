const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, '../.env') });

const ConnectDB = require('../Shared/ConfigDB');
const AuthRouter = require('./Routes/AuthRoutes');

ConnectDB(mongoose);

const app = express();

/**
 * TRUST PROXY (REQUIRED BEHIND NGINX)
 */
app.set('trust proxy', true);

/**
 * CORS — allow only gateway
 */
app.use(
    cors({
        origin: 'https://nginx-0yzj.onrender.com',
        credentials: true,
    })
);

/**
 * BODY PARSERS
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * HEALTH CHECK (NO REDIRECTS)
 */
app.get('/healthz', (req, res) => {
    return res.status(200).send('Auth Server Health is Fine');
});

/**
 * ROOT — DO NOT REDIRECT
 */
app.get('/', (req, res) => {
    return res.status(200).send('Auth Server 5001 is Running');
});

/**
 * ROUTES
 */
app.use('/auth', AuthRouter);

/**
 * DEBUG HEADER
 */
app.use((req, res, next) => {
    res.setHeader('X-Server-Port', '5001');
    next();
});

/**
 * 404 HANDLER (IMPORTANT)
 */
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl,
    });
});

/**
 * START SERVER
 */
app.listen(5001, () => {
    console.log('Auth Server running on port 5001');
});
