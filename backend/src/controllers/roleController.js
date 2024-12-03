const Role = require('../models/roleModel');

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching roles' });
  }
};

exports.addRole = async (req, res) => {
  try {
    const newRole = await Role.create(req.body);
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).json({ error: 'Error creating role' });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRole);
  } catch (err) {
    res.status(400).json({ error: 'Error updating role' });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Error deleting role' });
  }
};
