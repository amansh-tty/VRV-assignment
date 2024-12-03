const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const User = require("../models/userModel");
const Role = require("../models/roleModel");
const router = express.Router();

// Get all users
router.get("/", verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords for security
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});

// Add a user
router.post("/", verifyToken, authorizeRoles("admin"), async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const newUser = await User.create({ username, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
});

// Update user (e.g., role or status)
router.put("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
});

// Delete a user
router.delete("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});

module.exports = router;
