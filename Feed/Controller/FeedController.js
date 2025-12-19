const PostModel = require("../Model/post");

exports.addPost = async (req, res) => {
    try {
        const { title, des, userID, profileName } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Post Name is Required" })
        }
        const createdPost = await PostModel.create({
            title,
            des,
            userID,
            profileName
        });

        return res.status(200).json({ message: "Post Created Successfully", createdPost })
    } catch (error) {
        return res.status(500).json({ message: "Server Down" })
    }
};

exports.getAllPost = async (req, res) => {
    try {
        const allPosts = await PostModel.find();
        return res.status(200).json({ message: "All Posts", allPosts })
    } catch (error) {
        return res.status(500).json({ message: "Server Down" })
    }
}