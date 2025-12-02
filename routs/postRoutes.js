const express = require("express");
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require("../Middleware/Auth");

// Create a post
router.post("/create", auth, postController.createPost);

// Like / Unlike a post
router.post("/like/:postId", auth, postController.likePost);

// Comment on a post
router.post("/comment/:postId", auth, postController.commentPost);

// Fetch all posts (feed)
router.get("/feed", auth, postController.getFeed);

module.exports = router;
