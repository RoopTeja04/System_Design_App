const express = require('express');
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
    UpdatePost,
    getLikesDataInfo,
    AddComments,
    RemoveComments,
    updateComment,
    getCommentsByPostID,
    AddFollow,
    getPostsByFollowing,
} = require('../Controller/FeedController');
const FeedRouter = express.Router();

// Post Requests
FeedRouter.post('/upload-post', addPost);
FeedRouter.post('/add-bookmarks', addBookmarks);
FeedRouter.post('/add-like', AddToLike);
FeedRouter.post('/add-comment', AddComments);
FeedRouter.post('/add-follow', AddFollow);

// Get Requests
FeedRouter.get('/all-posts', getAllPost);
FeedRouter.get('/user-bookmarks/:userID', getUserBookmarks);
FeedRouter.get('/user-bookmarks-by-user/:userID', getBookmarksByUserID);
FeedRouter.get('/user-likes/:userID', getLikesByUserID);
FeedRouter.get('/likes-data/:postID', getLikesDataInfo);
FeedRouter.get('/comments/:postID', getCommentsByPostID);
FeedRouter.get('/user-feed/:userID', getPostsByFollowing);

//update Requests
FeedRouter.put('/update-post', UpdatePost);
FeedRouter.put('/update-comment', updateComment);

// Delete Requests
FeedRouter.delete('/delete-bookmark', deleteBookmarks);
FeedRouter.delete('/remove-like', RemoveLike);
FeedRouter.delete('/delete-post/:postID', deletePost);
FeedRouter.delete('/remove-comment/:commentID/:userID', RemoveComments);

module.exports = FeedRouter;
