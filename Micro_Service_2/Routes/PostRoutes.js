const express = require("express");
const { addPost } = require("../Controller/FeedController");
const FeedRouter = express.Router();

FeedRouter.post("/upload-post", addPost);

FeedRouter.get("/upload-post", (req, res) => {
  res.send("GET route working");
});

module.exports = FeedRouter;
