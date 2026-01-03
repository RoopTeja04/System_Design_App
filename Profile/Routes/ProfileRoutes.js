const express = require("express");
const { getProfileByID, getPostsByUserID, getFollowingById, getFollowersByID, removeFollowing } = require("../Controller/ProfileController");
const ProfileRouter = express.Router();

ProfileRouter.get("/view-profile/:userID", getProfileByID);
ProfileRouter.get("/view-posts/:userID", getPostsByUserID);
ProfileRouter.get("/view-following/:userID", getFollowingById);
ProfileRouter.get("/view-followers/:userID", getFollowersByID);

// Delete Routes
ProfileRouter.delete("/remove-following/:id", removeFollowing);

module.exports = ProfileRouter;