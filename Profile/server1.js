const express = require('express');
const ConnectDB = require('./DB_Config/ConfigDB');
const cors = require('cors');
const ProfileRouter = require('./Routes/ProfileRoutes');

ConnectDB();

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
