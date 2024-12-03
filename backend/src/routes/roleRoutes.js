const express = require("express");
const Role = require("../models/roleModel");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

// Get all roles
router.get("/", verifyToken, authorizeRoles("admin"), async (req, res) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: "Error fetching roles", error });
    }
});

// Create a new role
router.post("/", verifyToken, authorizeRoles("admin"), async (req, res) => {
    const { name, permissions } = req.body;
    try {
        const newRole = await Role.create({ name, permissions });
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json({ message: "Error creating role", error });
    }
});

// Update a role
router.put("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
    const { id } = req.params;
    const { name, permissions } = req.body;
    try {
        const updatedRole = await Role.findByIdAndUpdate(id, { name, permissions }, { new: true });
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: "Error updating role", error });
    }
});

// Delete a role
router.delete("/:id", verifyToken, authorizeRoles("admin"), async (req, res) => {
    const { id } = req.params;
    try {
        await Role.findByIdAndDelete(id);
        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting role", error });
    }
});

module.exports = router;
