const mongoose = require("mongoose");

const FollowSchema = new mongoose.Schema({
    followerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
    },
    followingID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchema",
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
}, { timestamps: true });

FollowSchema.index(
    { followerID: 1, followingID: 1 },
    { unique: true }
);

FollowSchema.index({ followerID: 1, createdAt: -1 });

module.exports = mongoose.model("FollowSchema", FollowSchema);