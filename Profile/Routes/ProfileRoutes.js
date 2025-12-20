const express = require("express");
const { getProfileByID, getPostsByUserID } = require("../Controller/ProfileController");
const ProfileRouter = express.Router();

ProfileRouter.get("/view-profile/:userID", getProfileByID);
ProfileRouter.get("/view-posts/:userID", getPostsByUserID);

module.exports = ProfileRouter;