const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const ConnectDB = require('../Shared/ConfigDB');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRoutes');

ConnectDB(mongoose);

const app = express();

app.set('trust proxy', 1);

app.use(
    cors({
        origin: 'https://system-design-nginx.onrender.com',
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('server 5001 is Running');
});

app.use('/auth', AuthRouter);

app.use((req, res, next) => {
    res.setHeader('X-Server-Port', '5001');
    next();
});

app.get('/healthz', (req, res) => {
    res.send('Auth Server Health is Fine');
});

app.listen('5001', (req, res) => {
    console.log('Auth Server 5001 is Running');
});
