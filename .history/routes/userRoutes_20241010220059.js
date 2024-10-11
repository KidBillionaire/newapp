const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/userModel');
const { protect } = require('../middleware/authMiddleware'); // Import JWT auth middleware

// Route to verify if the API is working
router.get('/test', (req, res) => {
  res.send('User route is working!');
});

// CREATE a new user
router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, totalWins, totalLosses, settings, chips, pokerHands, password } = req.body;

      // Ensure password is provided (if not using OAuth or other strategies)
      if (!password) {
        return res.status(400).json({ message: 'Password is required for creating a user.' });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email.' });
      }

      // Create a new user instance
      const newUser = new User({
        username,
        email,
        password, // Will be hashed using a pre-save hook
        totalWins: totalWins || 0,
        totalLosses: totalLosses || 0,
        settings: settings || {},
        chips: chips || 1000,
        pokerHands: pokerHands || [],
      });

      // Save the new user to the database
      await newUser.save();

      // Return a JSON web token upon successful user creation
      const token = newUser.generateAuthToken();

      res.status(201).json({ message: 'User created successfully', user: newUser, token });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
  }
);

// READ all users (protected route)
router.get('/', protect, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(400).json({ message: 'Error retrieving users', error: error.message });
  }
});

// READ a specific user by ID (protected route)
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(400).json({ message: 'Error retrieving user', error: error.message });
  }
});

// UPDATE a specific user by ID (protected route)
router.put('/:id', protect, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

// DELETE a specific user by ID (protected route)
router.delete('/:id', protect, async (req, res) => {
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
