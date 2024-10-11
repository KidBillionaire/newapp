const mongoose = require('mongoose');

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

// Main User schema for tracking user profile and game activity
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // Store email for contact and notifications
  totalWins: { type: Number, default: 0 }, // Total games won
  totalLosses: { type: Number, default: 0 }, // Total games lost
  profilePicture: { type: String, default: '' }, // URL to profile picture
  settings: userSettingsSchema, // Embed the settings schema
  pokerHands: [pokerHandSchema], // Array to track hand history
  currentTable: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' }, // Reference to the current table
  chips: { type: Number, default: 1000 }, // Total chips available to the user
  dateJoined: { type: Date, default: Date.now }, // Timestamp of when the user joined
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
