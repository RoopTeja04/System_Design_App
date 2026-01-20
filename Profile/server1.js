const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const ConnectDB = require('../Shared/ConfigDB');
const cors = require('cors');
const ProfileRouter = require('./Routes/ProfileRoutes');

ConnectDB(mongoose);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('server 7001 is Running');
});

app.use('/profile', ProfileRouter);

app.use((req, res, next) => {
    res.setHeader('X-Server-Port', '7001');
    next();
});

app.get('/healthz', (req, res) => {
    res.send('Health is Fine at Server 1');
});

app.listen('7001', (req, res) => {
    console.log('server 7001 is Running');
});
