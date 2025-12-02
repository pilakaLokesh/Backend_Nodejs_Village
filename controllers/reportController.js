const Report = require("../models/Report");
// const User = require('../models/User');
const Post = require("../models/UserPost");

exports.createReport = async (req, res) => {
    try {
        const { problemType, description, photoURL, audioURL, location } = req.body;

        const report = new Report({
            userId: req.user.userId,
            problemType,
            description,
            photoURL,
            audioURL,
            location
        });

        await report.save();

        //  Auto-create a social feed post if an image exists
        if (photoURL) {
            const post = new Post({
                userId: req.user.userId,
                description: description, // can also include problemType if you want
                images: [photoURL],
                isReportPost: true // optional flag to distinguish report posts
            });
            await post.save();
        }

        res.status(201).json({ message: "Report created successfully", report });
    } catch (err) {
        console.error("Create Report Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};


exports.updateReport = async (req, res) => {
    try {
        const reportId = req.params.id;
        const { problemType, description, photoURL, audioURL, location } = req.body;

        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        // Only allow user to edit their own report
        if (report.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "You can only edit your own report" });
        }

        // Update fields
        report.problemType = problemType || report.problemType;
        report.description = description || report.description;
        report.photoURL = photoURL || report.photoURL;
        report.audioURL = audioURL || report.audioURL;
        report.location = location || report.location;

        await report.save();

        res.status(200).json({ message: "Report updated successfully", report });
    } catch (err) {
        console.error("Update Report Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};


exports.deleteReport = async (req, res) => {
    try {
        const reportId = req.params.id;

        const report = await Report.findById(reportId);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        // Only allow user to delete their own report
        if (report.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "You can only delete your own report" });
        }

        await report.deleteOne();

        res.status(200).json({ message: "Report deleted successfully" });
    } catch (err) {
        console.error("Delete Report Error:", err);
        res.status(500).json({ error: "Server error" });
    }
};

