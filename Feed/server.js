const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const ConnectDB = require('../Shared/ConfigDB');
const FeedRouter = require('./Routes/PostRoutes');

ConnectDB(mongoose);

const app = express();

/**
 * TRUST PROXY (REQUIRED BEHIND NGINX)
 */
app.set('trust proxy', true);

/**
 * BODY PARSERS
 * Note: CORS is handled by NGINX gateway, not here
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * HEALTH CHECK (NO REDIRECTS)
 */
app.get('/healthz', (req, res) => {
    return res.status(200).send('Feed Server Health is Fine');
});

/**
 * ROOT — DO NOT REDIRECT
 */
app.get('/', (req, res) => {
    return res.status(200).send('Feed Server 6001 is Running');
});

/**
 * ROUTES
 */
app.use('/feed', FeedRouter);

/**
 * DEBUG HEADER
 */
app.use((req, res, next) => {
    res.setHeader('X-Server-Port', '6001');
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
app.listen(6001, () => {
    console.log('Feed Server running on port 6001');
});
