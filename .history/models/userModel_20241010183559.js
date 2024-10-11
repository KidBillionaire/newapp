// models/userModel.js
const mongoose = require('mongoose');

const pokerHandSchema = new mongoose.Schema({
  hand: String,
  result: String
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  pokerHands: [pokerHandSchema],
  totalWins: Number,
  totalLosses: Number
});

module.exports = mongoose.model('User', userSchema);
