const express = require('express');
const router = express.Router();
const Table = require('../models/tableModel'); // Import the Table model
const User = require('../models/userModel'); // Import the User model

// Add a Player to a Table
router.post('/:tableId/addPlayer', async (req, res) => {
  const { userId, seatNumber, chips } = req.body;
  
  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) return res.status(404).send('Table not found');

    // Check for the User by ID
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

    // Update the user's currentTable field
    user.currentTable = table._id;

    // Deduct the chips used to sit at the table from the user's total chips
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

module.exports = router;
