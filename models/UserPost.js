const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String },
    images: [{ type: String }], // array of image URLs
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            text: { type: String },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    isReportPost: { type: Boolean, default: false } // true if created from a report
}, { timestamps: true });

module.exports = mongoose.model("UserPost", postSchema);
