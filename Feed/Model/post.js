const mongoose = require("mongoose");

const PostSchema  = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    des:{
        type:String,
    },
}, {timestamps: true});

module.exports = mongoose.model("UserSchema", PostSchema);