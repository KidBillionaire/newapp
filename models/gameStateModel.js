// models/gameStateModel.js
const mongoose = require('mongoose');

const gameStateSchema = new mongoose.Schema({
    tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
    currentPot: { type: Number, default: 0 },
    playerHands: { type: Map, of: [String] }, // Key: userId, Value: array of player's cards
    boardCards: { type: [String], default: [] },
    status: { type: String, default: 'waiting' }, // Current game status
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GameState', gameStateSchema);

const GameState = require('../models/gameStateModel'); // Import the GameState model

// After creating a table
const newTable = new Table({ /* table data */ });
await newTable.save();

// Create an initial game state
const initialGameState = new GameState({
    tableId: newTable._id,
    currentPot: 0,
    playerHands: new Map(), // Initially empty
    boardCards: [],
    status: 'waiting'
});
await initialGameState.save();

