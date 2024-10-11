const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// GET a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

// CREATE a new user
router.post('/', async (req, res) => {
  const { username, pokerHands, totalWins, totalLosses } = req.body;
  try {
    const newUser = new User({ username, pokerHands, totalWins, totalLosses });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error creating user');
  }
});

// READ all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error retrieving users');
  }
});

// READ a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error retrieving user');
  }
});

// UPDATE a specific user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error updating user');
  }
});

// DELETE a specific user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).send('Error deleting user');
  }
});

module.exports = router;
