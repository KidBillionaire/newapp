const express = require('express');
const router = express.Router();
const Table = require('../models/tableModel'); // Import the Table model
const User = require('../models/userModel'); // Import the User model (for referencing players)

// 1. Create a New Table
router.post('/', async (req, res) => {
  const { tableName, numSeats, tableType, smallBlind, bigBlind } = req.body;
  try {
    const newTable = new Table({ tableName, numSeats, tableType, smallBlind, bigBlind });
    await newTable.save();
    res.status(201).json(newTable);
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ message: 'Error creating table' });
  }
});

// 2. Add a Player to a Table
router.post('/:tableId/addPlayer', async (req, res) => {
  const { userId, seatNumber, chips } = req.body;
  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) return res.status(404).send('Table not found');

    // Find the user by ID and add them to the table
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
    await user.save();

    await table.save();
    res.status(200).json(table);
  } catch (error) {
    console.error('Error adding player:', error);
    res.status(500).json({ message: 'Error adding player' });
  }
});

// 3. Remove a Player from a Table
router.delete('/:tableId/removePlayer/:playerId', async (req, res) => {
  try {
    const { tableId, playerId } = req.params;
    const table = await Table.findById(tableId);
    if (!table) return res.status(404).send('Table not found');

    // Find and remove the player from the table
    table.players = table.players.filter(player => player.userId.toString() !== playerId);

    // Update the user's currentTable field
    const user = await User.findById(playerId);
    if (user) {
      user.currentTable = null;
      await user.save();
    }

    await table.save();
    res.status(200).json(table);
  } catch (error) {
    console.error('Error removing player:', error);
    res.status(500).json({ message: 'Error removing player' });
  }
});

// 4. Deal Cards to Players and Update Board
router.post('/:tableId/dealCards', async (req, res) => {
  const { playerCards, boardCards } = req.body;
  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) return res.status(404).send('Table not found');

    // Assign cards to each player
    table.players.forEach(player => {
      if (playerCards[player.userId]) {
        player.cards = playerCards[player.userId]; // Assign cards based on input
      }
    });

    // Update the community board cards
    table.boardCards = boardCards;
    table.status = 'in-progress';

    await table.save();
    res.status(200).json(table);
  } catch (error) {
    console.error('Error dealing cards:', error);
    res.status(500).json({ message: 'Error dealing cards' });
  }
});

// 5. Update Game Status (e.g., "in-progress", "waiting", "completed")
router.put('/:tableId/status', async (req, res) => {
  const { status } = req.body;
  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) return res.status(404).send('Table not found');

    table.status = status;
    await table.save();
    res.status(200).json(table);
  } catch (error) {
    console.error('Error updating table status:', error);
    res.status(500).json({ message: 'Error updating status' });
  }
});

// 6. Retrieve All Tables
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    console.error('Error retrieving tables:', error);
    res.status(500).json({ message: 'Error retrieving tables' });
  }
});

// 7. Retrieve a Single Table by ID
router.get('/:tableId', async (req, res) => {
  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) return res.status(404).send('Table not found');
    res.status(200).json(table);
  } catch (error) {
    console.error('Error retrieving table:', error);
    res.status(500).json({ message: 'Error retrieving table' });
  }
});

module.exports = router;