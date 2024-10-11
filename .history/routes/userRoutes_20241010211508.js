const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Ensure correct import

// CREATE a new user
router.post('/', async (req, res) => {
  console.log('Incoming request body:', req.body); // Log the incoming request body for debugging

  const { username, email, totalWins, totalLosses, settings, chips, pokerHands } = req.body;

  try {
    // Ensure all required fields are passed correctly
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required.' });
    }

    // Creating a new user object with the received data
    const newUser = new User({
      username,
      email,
      totalWins: totalWins || 0,
      totalLosses: totalLosses || 0,
      settings: settings || {},
      chips: chips || 1000,
      pokerHands: pokerHands || [],
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

// READ all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(400).json({ message: 'Error retrieving users', error: error.message });
  }
});

module.exports = router;


// READ a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(400).json({ message: 'Error retrieving user', error: error.message });
  }
});

// UPDATE a specific user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

// DELETE a specific user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(400).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;
