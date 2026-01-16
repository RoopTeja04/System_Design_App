const express = require('express');
const {
    getProfileByID,
    getPostsByUserID,
    getFollowingById,
    getFollowersByID,
    removeFollowing,
    DeactivateAccount,
    ReactivateAccount,
    UpdateAccount,
} = require('../Controller/ProfileController');
const ProfileRouter = express.Router();

// Read Routes
ProfileRouter.get('/view-profile/:userID', getProfileByID);
ProfileRouter.get('/view-posts/:userID', getPostsByUserID);
ProfileRouter.get('/view-following/:userID', getFollowingById);
ProfileRouter.get('/view-followers/:userID', getFollowersByID);

// Post Routes
ProfileRouter.post('/deactivate-account', DeactivateAccount);

// Put Routes
ProfileRouter.put('/reactivate-account', ReactivateAccount);
ProfileRouter.put('/update-account', UpdateAccount);

// Delete Routes
ProfileRouter.delete('/remove-following/:id', removeFollowing);

module.exports = ProfileRouter;
