const ConnectDB = async (mongoose) => {
    try {
        const DB = process.env.MONGO_URI;

        if (!DB) {
            console.error('MONGO_URI is not defined in environment variables');
            process.exit(1);
        }

        await mongoose.connect(DB);
        console.log('Database Connected Successfully');
    } catch (err) {
        console.error('MongoDB connection failed', err.message);
        process.exit(1);
    }
};

module.exports = ConnectDB;
