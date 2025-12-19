const express = require("express");
const { addPost, getAllPost } = require("../Controller/FeedController");
const FeedRouter = express.Router();

FeedRouter.post("/upload-post", addPost);
FeedRouter.get("/all-posts", getAllPost);

module.exports = FeedRouter;
