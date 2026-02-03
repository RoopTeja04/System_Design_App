const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { createClient } = require('redis');

exports.verifyToken = (req, res, next) => {
    const Token = req.headers['authorization'];

    if (!Token) {
        return res.status(401).json({
            error: {
                code: 'Unauthorized',
                message: 'Token Not Found',
            },
        });
    }

    try {
        const decodedToken = jwt.verify(Token, JWT_SECRET);
        req.user = decodedToken;
        if (req.user) {
            next();
        }
    } catch (err) {
        return res.status(500).json({
            error: {
                code: 'Internal Server Error',
                message: 'Token Verification Failed',
            },
        });
    }
};

const createRedisClient = createClient({
    username: process.env.Redis_Username,
    password: process.env.Redis_Password,
    socket: {
        host: process.env.Redis_Host,
        port: process.env.Redis_Port,
    },
});

createRedisClient
    .connect()
    .then(() => {
        console.log('Redis Connected Successfully');
    })
    .catch((err) => {
        console.log('Redis Connection Failed', err);
    });

exports.RateLimit = async (req, res, next) => {
    const UserID = req.ip;

    const key = `rate limit: ${UserID}`;

    const count = await createRedisClient.incr(key);

    if (count === 1) {
        await createRedisClient.expire(key, 60);
    }

    if (count > 10) {
        return res.status(429).json({
            code: {
                error: 'Too Many Requests',
                message: 'Please Try Again After Some Time',
            },
        });
    }

    next();
};
