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
