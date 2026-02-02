const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config({ path: path.join(__dirname, '../.env') });

const ConnectDB = require('../Shared/ConfigDB');
const FeedRouter = require('./Routes/PostRoutes');

ConnectDB(mongoose);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthz', (req, res) => {
    return res.status(200).send('Feed Server Health is Fine');
});

app.get('/', (req, res) => {
    return res.status(200).send('Feed Server 6001 is Running');
});

app.use('/feed', FeedRouter);

app.listen(6001, () => {
    console.log('Feed Server running on port 6001');
});
