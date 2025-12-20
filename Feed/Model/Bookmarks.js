const mongoose = require("mongoose");

const BookmarksSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostSchema",
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("BookmarksSchema", BookmarksSchema);