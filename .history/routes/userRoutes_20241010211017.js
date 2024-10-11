const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// CREATE a new user
router.post('/', async (req, res) => {
  const { username, pokerHands, totalWins, totalLosses } = req.body;
  try {
    const newUser = new User({ username, pokerHands, totalWins, totalLosses });
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

router.get('/test', (req, res) => {
    res.send('User route is working!');
  });

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
