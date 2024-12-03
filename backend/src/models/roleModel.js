const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: {
        type: [String], // Example: ["read", "write", "delete", "manage_roles"]
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Role", roleSchema);
