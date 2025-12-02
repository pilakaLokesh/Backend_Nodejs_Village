const multer = require("multer");
const path = require("path");

// IMAGE STORAGE
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/images/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

// AUDIO STORAGE
const audioStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/audio/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

// FILTERS
const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb("Only images allowed", false);
};

const audioFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("audio")) cb(null, true);
    else cb("Only audio files allowed", false);
};

module.exports = {
    uploadImage: multer({ storage: imageStorage, fileFilter: imageFilter }).single("image"),
    uploadAudio: multer({ storage: audioStorage, fileFilter: audioFilter }).single("audio"),
};
