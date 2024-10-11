const mongoose = require('mongoose');

// Player Schema for players at the table
const playerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Link to User document
  username: String, // Username of the player
  chips: Number, // Chips the player has on the table
  seatNumber: Number, // Seat number assigned to the player
  status: { type: String, enum: ['active', 'folded', 'out'], default: 'active' }, // Player status during the game
  cards: [String], // Cards dealt to the player (e.g., ['AH', 'KH'])
  bet: { type: Number, default: 0 } // Current bet amount in the active round
});

// Action Schema for tracking player actions (e.g., "bet", "raise", "fold")
const actionSchema = new mongoose.Schema({
  actionType: { type: String, enum: ['bet', 'raise', 'fold', 'call', 'check'], required: true },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Player making the action
  amount: { type: Number, default: 0 }, // Amount for the action (e.g., bet/raise amount)
  timestamp: { type: Date, default: Date.now }
});

// Table Schema
const tableSchema = new mongoose.Schema({
  tableName: { type: String, required: true },
  numSeats: { type: Number, required: true },
  tableType: { type: String, enum: ['cash', 'tournament'], required: true },
  smallBlind: { type: Number, default: 10 }, // Small blind for cash games
  bigBlind: { type: Number, default: 20 }, // Big blind for cash games
  potAmount: { type: Number, default: 0 }, // Total pot amount in the current round
  players: [playerSchema], // Array of players sitting at the table
  boardCards: [String], // Community cards dealt to the table (e.g., ['AH', '7S', 'KD'])
  roundActions: [actionSchema], // Track actions taken during the current round
  createdAt: { type: Date, default: Date.now },
  currentDealer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Player acting as the dealer
  currentTurn: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Player whose turn it is to act
  status: { type: String, enum: ['waiting', 'in-progress', 'completed'], default: 'waiting' },
  winners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of winner(s) for hand history
});

module.exports = mongoose.model('Table', tableSchema);
