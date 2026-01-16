const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        profileName: {
            type: String,
            required: true,
        },
        mediaURL: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            required: true,
        },
        des: {
            type: String,
        },
        likesCount: {
            type: Number,
            default: 0,
        },
        commentsCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('PostSchema', PostSchema);
