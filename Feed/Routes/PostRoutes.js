const express = require("express");
const { addPost, getAllPost, addBookmarks, getUserBookmarks } = require("../Controller/FeedController");
const FeedRouter = express.Router();

FeedRouter.post("/upload-post", addPost);
FeedRouter.get("/all-posts", getAllPost);
FeedRouter.post("/add-bookmarks", addBookmarks);
FeedRouter.get("/user-bookmarks/:userID", getUserBookmarks);

module.exports = FeedRouter;