const Bookmarks = require('../Model/Bookmarks');
const CommentModel = require('../Model/Comment');
const Likes = require('../Model/Likes');
const PostModel = require('../Model/post');
const UserModel = require('../Model/UserModel');
const FollowModel = require('../Model/Follow');

exports.addPost = async (req, res) => {
    try {
        const { title, des, userID, profileName, mediaURL } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Post Name is Required' });
        }
        const createdPost = await PostModel.create({
            title,
            des,
            userID,
            profileName,
            mediaURL,
        });

        return res
            .status(200)
            .json({ message: 'Post Created Successfully', createdPost });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down' });
    }
};

exports.getAllPost = async (req, res) => {
    try {
        const allPosts = await PostModel.find().sort({ createdAt: -1 });
        return res.status(200).json({ message: 'All Posts', allPosts });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down' });
    }
};

exports.addBookmarks = async (req, res) => {
    try {
        const { userID, postID } = req.body;

        console.log(userID, postID);

        if (!userID || !postID) {
            return res
                .status(400)
                .json({ message: 'Unable to Add in Bookmarks' });
        }

        const CreatedBookmarks = await Bookmarks.create({ userID, postID });

        return res
            .status(200)
            .json({ message: 'Added to Bookmarks', CreatedBookmarks });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down' });
    }
};

exports.getUserBookmarks = async (req, res) => {
    try {
        const { userID } = req.params;

        if (!userID) {
            return res
                .status(401)
                .message({ message: 'Unable to Get Bookmarks' });
        }

        const bookmarks = await Bookmarks.find({ userID });
        return res.status(200).json({ message: 'User Bookmarks', bookmarks });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down' });
    }
};

exports.deleteBookmarks = async (req, res) => {
    try {
        const { userID } = req.query;
        const { postID } = req.query;

        if (!userID || !postID) {
            return res
                .status(400)
                .json({ message: 'Unable to Remove Bookmark' });
        }

        const deletedBookmark = await Bookmarks.deleteOne({ userID, postID });

        return res.status(200).json({
            message: 'Bookmark Removed Successfully',
            deletedBookmark,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down' });
    }
};

exports.getBookmarksByUserID = async (req, res) => {
    try {
        const { userID } = req.params;

        if (!userID) {
            return res.status(401).json({ message: 'Unable to Get Bookmarks' });
        }

        const bookmarks = await Bookmarks.find({ userID }).populate('postID');

        return res.status(200).json({ message: 'User Bookmarks', bookmarks });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};

exports.AddToLike = async (req, res) => {
    try {
        const { userID, postID } = req.body;

        if (!userID || !postID) {
            return res.status(400).json({ message: 'Unable to Add Like' });
        }
        const createdLike = await Likes.create({ userID, postID });

        await PostModel.findByIdAndUpdate(
            { _id: postID },
            { $inc: { likesCount: 1 } }
        );

        return res
            .status(200)
            .json({ message: 'Like Added Successfully', createdLike });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};

exports.RemoveLike = async (req, res) => {
    try {
        const { userID, postID } = req.body;

        if (!userID || !postID) {
            return res.status(400).json({ message: 'Unable to dislike' });
        }

        const deleteLike = await Likes.deleteOne({ postID, userID });

        await PostModel.findByIdAndUpdate(
            { _id: postID },
            { $inc: { likesCount: -1 } }
        );

        return res
            .status(200)
            .json({ message: 'Like Removed Successfully', deleteLike });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};

exports.getLikesByUserID = async (req, res) => {
    try {
        const { userID } = req.params;

        if (!userID) {
            return res.status(401).json({ message: 'Unable to Get Likes' });
        }

        const likes = await Likes.find({ userID });

        return res.status(200).json({ message: 'User Likes', likes });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { postID } = req.params;

        if (!postID) {
            return res.status(400).json({ message: 'Unable to Delete Post' });
        }

        await PostModel.findByIdAndDelete(postID);

        res.status(200).json({ message: 'Post Deleted Successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};

exports.UpdatePost = async (req, res) => {
    try {
        const { title, des, postID } = req.body;

        if (!title || !postID) {
            return res.status(400).json({ message: 'Unable to Update Post' });
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            { _id: postID },
            { title, des },
            { new: true }
        );

        return res
            .status(200)
            .json({ message: 'Post Updated Successfully', updatedPost });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};

exports.getLikesDataInfo = async (req, res) => {
    try {
        const { postID } = req.params;

        if (!postID) {
            return res.status(400).json({ message: 'Unable Get Likes Data' });
        }

        const LikesData = await Likes.find({ postID }).lean();

        if (!LikesData.length === 0) {
            return res.status(200).json({ message: 'No likes found' });
        }

        const userIDs = [...new Set(LikesData.map((like) => like.userID))];

        const FetchUserInfos = await UserModel.find({ _id: userIDs }).select(
            '-password -email'
        );

        return res.status(200).json({
            message: 'Likes Data',
            Total_Likes: LikesData.length,
            FetchUserInfos,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};

exports.AddComments = async (req, res) => {
    try {
        const { postID, userID, userName, comment } = req.body;

        if (!postID || !userID || !userName || !comment) {
            return res.status(400).json({ message: 'Unable to Add Comments' });
        }

        const createdComment = await CommentModel.create({
            postID,
            userID,
            userName,
            comment,
        });

        await PostModel.findByIdAndUpdate(
            { _id: postID },
            { $inc: { commentsCount: 1 } }
        );

        return res
            .status(200)
            .json({ message: 'Comment added Successfully', createdComment });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};

exports.RemoveComments = async (req, res) => {
    try {
        const { commentID, userID } = req.params;

        const findComment = await CommentModel.findById(commentID);

        if (!findComment) {
            return res.status(404).json({ message: 'Comment Not Found' });
        }

        if (userID !== findComment.userID) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const DeletedComment = await CommentModel.findByIdAndDelete(commentID);

        await PostModel.findByIdAndUpdate(
            { _id: findComment.postID },
            { $inc: { commentsCount: -1 } }
        );

        return res
            .status(200)
            .json({ message: 'Comment Deleted Successfully', DeletedComment });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const { commentID, userID, comment } = req.body;

        const findComment = await CommentModel.findById(commentID);

        if (!findComment) {
            return res.status(404).json({ message: 'Comment Not Found' });
        }

        if (userID !== findComment.userID) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const updatedComment = await CommentModel.findByIdAndUpdate(
            commentID,
            { comment },
            { new: true }
        );

        return res
            .status(200)
            .json({ message: 'Comment Updated Successfully', updatedComment });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};

exports.getCommentsByPostID = async (req, res) => {
    try {
        const { postID } = req.params;

        if (!postID) {
            return res.status(400).json({ message: 'Unable to Get Comments' });
        }

        const comments = await CommentModel.find({ postID }).lean();

        return res.status(200).json({
            message: 'Comments',
            commentsCount: comments.length,
            comments,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};

exports.AddFollow = async (req, res) => {
    try {
        const { followerID, followingID, userName } = req.body;

        if (!followerID || !followingID) {
            return res.status(400).json({ message: 'Unable to Follow' });
        }

        const CreatedFollow = await FollowModel.create({
            followerID,
            followingID,
            userName,
        });

        return res
            .status(200)
            .json({ message: 'Following Successfully', CreatedFollow });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};

exports.getPostsByFollowing = async (req, res) => {
    try {
        const { userID } = req.params;

        const FollowingList = await FollowModel.find({
            followerID: userID,
        })
            .select('followingID')
            .lean();

        const followingIDs = FollowingList.map((f) => f.followingID);

        if (followingIDs.length === 0) {
            return res.status(200).json({
                message: 'No following users',
                feedPost: [],
            });
        }

        const feedPost = await PostModel.find({
            userID: { $in: followingIDs },
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: 'Your Feed',
            feedPost,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server Down', error });
    }
};
