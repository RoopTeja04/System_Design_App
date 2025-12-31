const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    postID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, { timestamps: true });

CommentSchema.index({ postID: 1, createdAt: -1 });

module.exports = mongoose.model("CommentSchema", CommentSchema);