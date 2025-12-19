const PostModel = require("../Model/post");

exports.addPost = async (req, res) => {
    const { text, des } = req.body;

    const createdPost = await PostModel.create({
        text,
        des
    })

    return res.status(200).json({ message:"create POst SuccessFully", createdPost})
};