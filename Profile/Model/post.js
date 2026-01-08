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
        title: {
            type: String,
            required: true,
        },
        des: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
        comments: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('PostSchema', PostSchema);
