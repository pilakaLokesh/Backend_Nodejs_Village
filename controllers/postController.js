const Post = require("../models/UserPost");

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { description, images } = req.body;

        const post = new Post({
            userId,
            description,
            images
        });

        await post.save();
        res.status(201).json({ message: "Post created successfully", post });
    } catch (err) {
        console.error("Create Post Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};

// Like or unlike a post
exports.likePost = async (req, res) => {
    try {
        const userId = req.user.userId;
        const postId = req.params.postId;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const index = post.likes.indexOf(userId);
        if (index === -1) {
            post.likes.push(userId); // like
        } else {
            post.likes.splice(index, 1); // unlike
        }

        await post.save();
        res.status(200).json({ message: "Post like status updated", likesCount: post.likes.length });
    } catch (err) {
        console.error("Like Post Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};

// Comment on a post
exports.commentPost = async (req, res) => {
    try {
        const userId = req.user.userId;
        const postId = req.params.postId;
        const { text } = req.body;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        post.comments.push({ userId, text });
        await post.save();

        res.status(201).json({ message: "Comment added successfully", comments: post.comments });
    } catch (err) {
        console.error("Comment Post Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};

// Fetch all posts (feed)
exports.getFeed = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("userId", "username villagename")      // poster info
            .populate("comments.userId", "username")        // commenter info
            .sort({ createdAt: -1 });                       // newest first

        res.status(200).json(posts);
    } catch (err) {
        console.error("Get Feed Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};
