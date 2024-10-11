// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  pokerHands: [
    {
      hand: { type: String, required: true }, // Stores the poker hand (e.g., "A♠ K♣")
      result: { type: String, required: true } // Stores "Win" or "Lose"
    }
  ],
  totalWins: { type: Number, default: 0 },
  totalLosses: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
