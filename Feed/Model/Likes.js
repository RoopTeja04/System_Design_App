const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    postID: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

LikesSchema.index({ postID: 1, userID: 1 }, { unique: true });

module.exports = mongoose.model("likesSchema", LikesSchema);