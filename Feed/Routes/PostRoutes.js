const express = require("express");
const {
    addPost,
    getAllPost,
    addBookmarks,
    getUserBookmarks,
    deleteBookmarks,
    getBookmarksByUserID,
    AddToLike,
    RemoveLike,
    getLikesByUserID,
    deletePost,
    UpdatePost
} = require("../Controller/FeedController");
const FeedRouter = express.Router();

// Post Requests
FeedRouter.post("/upload-post", addPost);
FeedRouter.post("/add-bookmarks", addBookmarks);
FeedRouter.post("/add-like", AddToLike);

// Get Requests
FeedRouter.get("/all-posts", getAllPost);
FeedRouter.get("/user-bookmarks/:userID", getUserBookmarks);
FeedRouter.get("/user-bookmarks-by-user/:userID", getBookmarksByUserID);
FeedRouter.get("/user-likes/:userID", getLikesByUserID);

//update Requests
FeedRouter.put("/update-post", UpdatePost);

// Delete Requests
FeedRouter.delete("/delete-bookmark", deleteBookmarks);
FeedRouter.delete("/remove-like", RemoveLike);
FeedRouter.delete("/delete-post/:postID", deletePost);

module.exports = FeedRouter;