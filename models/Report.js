const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    problemType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
        default: null
    },
    audioURL: {
        type: String,
        default: null
    },
    location: {
        lat: { type: Number },
        lng: { type: Number }
    },
    status: {
        type: String,
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Report", reportSchema);
