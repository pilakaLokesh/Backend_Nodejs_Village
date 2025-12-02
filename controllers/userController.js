const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const dotEnv = require('dotenv')

dotEnv.config()

const JWT_SECRET = process.env.JWT_SECRET

const userRegister = async (req, res) => {
    const { username, email, phone, villagename, password } = req.body;

    try {
        // Check existing email
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return res.status(400).json("Email already exists");
        }

        // Check existing phone
        const userPhone = await User.findOne({ phone });
        if (userPhone) {
            return res.status(400).json("Number already exists");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            phone,
            villagename,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "Registration Successful" });
        console.log("registered");

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error" });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ success: "Login Successful", token });

        console.log("Login Token for:", email, token);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();  // fetch all users

        res.status(200).json({
            message: "All users fetched successfully",
            data: users
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};



const updateUser = async (req, res) => {
    try {
        const userId = req.user.userId; // from auth middleware
        const { username, email, phone, villagename, password } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Optional: check if email or phone is already taken by someone else
        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) return res.status(400).json({ message: "Email already in use" });
            user.email = email;
        }

        if (phone && phone !== user.phone) {
            const existingPhone = await User.findOne({ phone });
            if (existingPhone) return res.status(400).json({ message: "Phone already in use" });
            user.phone = phone;
        }

        if (username) user.username = username;
        if (villagename) user.villagename = villagename;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json({ message: "User details updated successfully", user });
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Delete user account permanently
const deleteUser = async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.deleteOne({ _id: userId });

        res.status(200).json({ message: "Account deleted permanently" });
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { userRegister, userLogin, updateUser, deleteUser, getAllUsers };





