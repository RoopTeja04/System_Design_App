const Bookmarks = require("../Model/Bookmarks");
const Likes = require("../Model/Likes");
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
        const allPosts = await PostModel.find().sort({ createdAt: -1 });
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

        if (!userID) {
            return res.status(401).message({ message: "Unable to Get Bookmarks" });
        }

        const bookmarks = await Bookmarks.find({ userID });
        return res.status(200).json({ message: "User Bookmarks", bookmarks })
    } catch (error) {
        return res.status(500).json({ message: "Server Down" })
    }
}

exports.deleteBookmarks = async (req, res) => {
    try {
        const { userID } = req.query;
        const { postID } = req.query;

        if (!userID || !postID) {
            return res.status(400).json({ message: "Unable to Remove Bookmark" });
        }

        const deletedBookmark = await Bookmarks.deleteOne({ userID, postID });

        return res.status(200).json({ message: "Bookmark Removed Successfully", deletedBookmark });
    } catch (error) {
        return res.status(500).json({ message: "Server Down" })
    }
}

exports.getBookmarksByUserID = async (req, res) => {
    try {
        const { userID } = req.params;

        if (!userID) {
            return res.status(401).json({ message: "Unable to Get Bookmarks" });
        }

        const bookmarks = await Bookmarks.find({ userID }).populate("postID");

        return res.status(200).json({ message: "User Bookmarks", bookmarks })
    } catch (error) {
        return res.status(500).json({ message: "Server Down", error })
    }
}

exports.AddToLike = async (req, res) => {
    try {
        const { userID, postID } = req.body;

        if (!userID || !postID) {
            return res.status(400).json({ message: "Unable to Add Like" });
        }
        const createdLike = await Likes.create({ userID, postID });

        await PostModel.findByIdAndUpdate({ _id: postID }, { $inc: { likesCount: 1 } })

        return res.status(200).json({ message: "Like Added Successfully", createdLike });
    } catch (error) {
        return res.status(500).json({ message: "Server Down", error })
    }
}

exports.RemoveLike = async (req, res) => {
    try {
        const { userID, postID } = req.body;

        if (!userID || !postID) {
            return res.status(400).json({ message: "Unable to dislike" });
        }

        const deleteLike = await Likes.deleteOne({ postID, userID });

        await PostModel.findByIdAndUpdate({ _id: postID }, { $inc: { likesCount: -1 } })

        return res.status(200).json({ message: "Like Removed Successfully", deleteLike });
    } catch (error) {
        return res.status(500).json({ message: "Server Down", error })
    }
}

exports.getLikesByUserID = async (req, res) => {
    try {
        const { userID } = req.params;

        if (!userID) {
            return res.status(401).json({ message: "Unable to Get Likes" });
        }

        const likes = await Likes.find({ userID });

        return res.status(200).json({ message: "User Likes", likes })
    } catch (error) {
        return res.status(500).json({ message: "Server Down", error })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { postID } = req.params;

        if (!postID) {
            return res.status(400).json({ message: "Unable to Delete Post" })
        }

        await PostModel.findByIdAndDelete(postID);

        res.status(200).json({ message: "Post Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server Down", error })
    }
}