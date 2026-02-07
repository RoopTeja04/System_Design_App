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

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/healthz', (req, res) => {
    res.status(200).send('Auth Server Health is Fine');
});

app.get('/', (req, res) => {
    res.status(200).send('Auth Server 5001 is Running');
});

app.use('/auth', AuthRouter);

app.listen(5001, () => {
    console.log('Auth Server running on port 5001');
});
