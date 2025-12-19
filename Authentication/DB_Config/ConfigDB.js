const mongoose = require("mongoose");

const ConnectDB = async (req, res) => {
  try {
    const DB =
      "mongodb+srv://OnlineOrder:OnlineOrder@cluster0.jueauws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    await mongoose.connect(DB);
    console.log("Database Connected")
  } catch (err) {
    console.error("MongoDB connection failed", err.message);
    process.exit(1);
  }
};

module.exports = ConnectDB;