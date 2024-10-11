const mongoose = require('mongoose');

// Player Schema for players at the table
const playerSchema = new mongoose.Schema({
  username: String,
  chips: Number,
  seatNumber: Number,
  status: String, // Can be 'active', 'folded', or 'out'
  cards: [String], // Cards dealt to the player
});

// Table Schema
const tableSchema = new mongoose.Schema({
  tableName: { type: String, required: true },
  numSeats: { type: Number, required: true },
  tableType: { type: String, enum: ['cash', 'tournament'], required: true },
  players: [playerSchema], // Array of players sitting at the table
  createdAt: { type: Date, default: Date.now },
  boardCards: [String], // Community cards dealt to the table
  status: { type: String, enum: ['waiting', 'in-progress', 'completed'], default: 'waiting' },
});

module.exports = mongoose.model('Table', tableSchema);
