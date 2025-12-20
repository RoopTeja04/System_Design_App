const Bookmarks = require("../Model/Bookmarks");
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

exports.addBookmarks = async (req, res) => {
    try {
        const { userID, postID } = req.body;

        console.log(userID, postID)

        if (!userID || !postID) {
            return res.status(400).json({ message: "Unable to Add in Bookmarks" });
        }

        const CreatedBookmarks = await Bookmarks.create({ userID, postID });

        return res.status(200).json({ message: "Added to Bookmarks", CreatedBookmarks });

    } catch (error) {
        return res.status(500).json({ message: "Server Down" })
    }
}

exports.getUserBookmarks = async (req, res) => {
    try {
        const { userID } = req.params;
        const bookmarks = await Bookmarks.find({ userID });

        if (!bookmarks) {
            return res.status(404).json({ message: "No Bookmarks found" })
        }

        return res.status(200).json({ message: "User Bookmarks", bookmarks })
    } catch (error) {
        return res.status(500).json({ message: "Server Down" })
    }
}