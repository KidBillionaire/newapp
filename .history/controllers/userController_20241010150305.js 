// controllers/userController.js
const User = require('../models/userModel');

// Get all users with their poker hands
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users);                 // Send users as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

