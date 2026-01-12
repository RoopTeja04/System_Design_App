const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: '',
        },
        username: {
            type: String,
            default: '',
        },
        bio: {
            type: String,
            default: '',
        },
        isDeactived: {
            type: Boolean,
            default: false,
        },
        deactiveUntill: {
            type: Date,
            default: null,
        },
        deactivateReason: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('UserSchema', UserSchema);
