const express = require('express');
const ConnectDB = require('./DB_Config/ConfigDB');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRoutes');

ConnectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('server 5002 is Running');
});

app.use('/auth', AuthRouter);

app.use((req, res, next) => {
    res.setHeader('X-Server-Port', '5002');
    next();
});

app.get('/healthz', (req, res) => {
    res.send('Health is Fine at Server 2');
});

app.listen('5002', (req, res) => {
    console.log('server 5002 is Running');
});
