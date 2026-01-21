const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const ConnectDB = require('../Shared/ConfigDB');
const cors = require('cors');
const FeedRouter = require('./Routes/PostRoutes');

ConnectDB(mongoose);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('server 6001 is Running');
});

app.use((req, res, next) => {
    console.log('Incoming URL:', req.originalUrl);
    next();
});

app.use('/feed', FeedRouter);

app.use((req, res, next) => {
    res.setHeader('X-Server-Port', '6001');
    next();
});

app.get('/healthz', (req, res) => {
    res.send('Feed Server Health is Fine');
});

app.listen('6001', (req, res) => {
    console.log('Feed Server 6001 is Running');
});
