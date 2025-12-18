const express = require("express");
const { getProfileByID } = require("../Controller/ProfileController");
const ProfileRouter = express.Router();

ProfileRouter.get("/view-profile/:userID", getProfileByID);

module.exports = ProfileRouter;