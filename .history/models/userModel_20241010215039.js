const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Schema for tracking individual poker hands (e.g., hand history)
const pokerHandSchema = new mongoose.Schema({
  hand: { type: String, required: true }, // Example: "AH, KH" (Ace of Hearts, King of Hearts)
  result: { type: String, required: true }, // Example: "Win" or "Loss"
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' }, // Reference to the table where the hand was played
  date: { type: Date, default: Date.now } // Timestamp of when the hand was played
});

// Schema for user settings (to personalize the experience)
const userSettingsSchema = new mongoose.Schema({
  emailNotifications: { type: Boolean, default: true },
  smsNotifications: { type: Boolean, default: false },
  profileVisibility: { type: String, enum: ['public', 'private'], default: 'public' },
  theme: { type: String, default: 'light' }, // UI theme preference
  tablePreferences: {
    autoRebuy: { type: Boolean, default: false }, // Automatically buy-in when chips are low
    showAvatar: { type: Boolean, default: true } // Option to show/hide avatar in games
  }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalWins: { type: Number, default: 0 },
  totalLosses: { type: Number, default: 0 },
  chips: { type: Number, default: 1000 },
  dateJoined: { type: Date, default: Date.now },
});

// Pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare the entered password with the hashed password
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT for the user
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, username: this.username }, 'secretKey', { expiresIn: '1h' });
};

module.exports = mongoose.model('User', userSchema);

// Export the User model
module.exports = mongoose.model('User', userSchema);

const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Import the User model
const Table = require('../models/tableModel'); // Import the Table model

/**
 * Route to Create a New User
 */
router.post('/createUser', async (req, res) => {
  const { username, email } = req.body;
  
  try {
    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Error creating user', error });
  }
});

/**
 * Route to Update User Profile and Settings
 */
router.put('/updateProfile/:userId', async (req, res) => {
  const { profilePicture, settings, totalWins, totalLosses, chips } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).send('User not found');

    // Update fields if provided in the request body
    if (profilePicture) user.profilePicture = profilePicture;
    if (settings) user.settings = { ...user.settings.toObject(), ...settings };
    if (totalWins !== undefined) user.totalWins = totalWins;
    if (totalLosses !== undefined) user.totalLosses = totalLosses;
    if (chips !== undefined) user.chips = chips;

    await user.save();

    res.status(200).json({ message: 'User profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

/**
 * Route to Add a Player to a Table
 */
router.post('/:tableId/addPlayer', async (req, res) => {
  const { userId, seatNumber, chips } = req.body;

  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) return res.status(404).send('Table not found');

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Ensure seat is not already taken
    const seatOccupied = table.players.some(player => player.seatNumber === seatNumber);
    if (seatOccupied) return res.status(400).send('Seat is already occupied');

    // Add the player to the table
    const newPlayer = {
      userId: user._id,
      username: user.username,
      chips,
      seatNumber,
      status: 'active',
      cards: [],
    };
    table.players.push(newPlayer);

    // Update the user's currentTable field and deduct the chips used to sit at the table
    user.currentTable = table._id;
    if (user.chips < chips) return res.status(400).send('Insufficient chips');
    user.chips -= chips;

    await user.save();
    await table.save();

    res.status(200).json({ message: 'Player added successfully', table });
  } catch (error) {
    console.error('Error adding player:', error);
    res.status(500).json({ message: 'Error adding player', error });
  }
});

/**
 * Route to Remove a Player from a Table
 */
router.post('/:tableId/removePlayer', async (req, res) => {
  const { userId, seatNumber } = req.body;

  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) return res.status(404).send('Table not found');

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Find and remove the player from the table
    const playerIndex = table.players.findIndex(player => player.userId.toString() === userId && player.seatNumber === seatNumber);
    if (playerIndex === -1) return res.status(400).send('Player not found at this seat');

    // Return chips to the user
    const player = table.players[playerIndex];
    user.chips += player.chips;

    // Remove the player from the table and update user data
    table.players.splice(playerIndex, 1);
    user.currentTable = null;

    await user.save();
    await table.save();

    res.status(200).json({ message: 'Player removed successfully', table });
  } catch (error) {
    console.error('Error removing player:', error);
    res.status(500).json({ message: 'Error removing player', error });
  }
});

module.exports = router;
