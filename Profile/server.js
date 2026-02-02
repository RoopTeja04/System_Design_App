const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, '../.env') });

const ConnectDB = require('../Shared/ConfigDB');
const ProfileRouter = require('./Routes/ProfileRoutes');

ConnectDB(mongoose);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthz', (req, res) => {
    return res.status(200).send('Profile Server Health is Fine');
});

app.get('/', (req, res) => {
    return res.status(200).send('Profile Server 7001 is Running');
});

app.use('/profile', ProfileRouter);

app.listen(7001, () => {
    console.log('Profile Server running on port 7001');
});
