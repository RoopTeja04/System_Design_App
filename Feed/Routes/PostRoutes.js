const express = require("express");
const { addPost, getAllPost, addBookmarks, getUserBookmarks, deleteBookmarks, getBookmarksByUserID } = require("../Controller/FeedController");
const FeedRouter = express.Router();

// Post Requests
FeedRouter.post("/upload-post", addPost);
FeedRouter.post("/add-bookmarks", addBookmarks);

// Get Requests
FeedRouter.get("/all-posts", getAllPost);
FeedRouter.get("/user-bookmarks/:userID", getUserBookmarks);
FeedRouter.get("/user-bookmarks-by-user/:userID", getBookmarksByUserID);

// Delete Requests
FeedRouter.delete("/delete-bookmark", deleteBookmarks);

module.exports = FeedRouter;