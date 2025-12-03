const express = require("express");
const router = express.Router();

const { adminLogin, getAdmins } = require('../controllers/adminContreoller');

// Admin login
router.post("/login", adminLogin);

// Get all admins (optional)
router.get("/all", getAdmins);

module.exports = router;
