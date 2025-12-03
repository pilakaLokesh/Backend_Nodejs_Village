const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

// Login admin
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin)
            return res.status(401).json({ error: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch)
            return res.status(401).json({ error: "Invalid email or password" });

        res.status(200).json({ message: "Admin Login Successful" });

    } catch (err) {
        console.error("Admin Login Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all admins
exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};
