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
})

module.exports = mongoose.model("CommentSchema", CommentSchema);