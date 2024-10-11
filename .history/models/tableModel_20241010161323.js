const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
  tableName: { type: String, required: true },
  numSeats: { type: Number, required: true },
  tableType: { type: String, required: true },
  players: [{ type: String }] // Store player usernames (optional)
});

const Table = mongoose.model('Table', tableSchema);
module.exports = Table;
