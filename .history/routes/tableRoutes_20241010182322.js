const express = require('express');
const router = express.Router();
const Table = require('../models/tableModel');

// Helper Function: Generate Dummy AI Player Names
const generateAIPlayers = (num) => {
  const aiNames = [
    'AI_Rocky',
    'AI_Sharp',
    'AI_BluffMaster',
    'AI_Smarty',
    'AI_Speedy',
    'AI_BraveHeart',
    'AI_Lucky',
    'AI_Slick',
    'AI_Thinker',
    'AI_Hustler'
  ];
  return aiNames.slice(0, num); // Select the required number of AI players
};

// 1. POST `/tables` - Create a new poker table
router.post('/', async (req, res) => {
  const { tableName, numSeats, tableType } = req.body;

  // Create AI players based on the number of seats
  const aiPlayers = generateAIPlayers(numSeats);

  try {
    const newTable = new Table({ tableName, numSeats, tableType, players: [], aiPlayers });
    await newTable.save();
    res.status(201).send(newTable);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error creating table');
  }
});

// 2. GET `/tables` - Fetch all tables
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find({});
    res.status(200).send(tables);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error fetching tables');
  }
});

// 3. GET `/tables/:tableId` - Fetch a specific table by ID
router.get('/:tableId', async (req, res) => {
  const { tableId } = req.params;

  try {
    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).send('Table not found');
    }
    res.status(200).send(table);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error fetching table details');
  }
});

// 4. POST `/tables/:tableId/join` - Add a player to the table
router.post('/:tableId/join', async (req, res) => {
  const { tableId } = req.params;
  const { playerName, playerChips } = req.body;

  try {
    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).send('Table not found');
    }

    // Check if table is full
    if (table.players.length >= table.numSeats) {
      return res.status(400).send('Table is full');
    }

    // Add player to the table
    table.players.push({ name: playerName, chips: playerChips, sittingIn: true });
    await table.save();

    res.status(200).send(table);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error joining table');
  }
});

// 5. PUT `/tables/:tableId` - Update table state (e.g., player actions)
router.put('/:tableId', async (req, res) => {
  const { tableId } = req.params;
  const { players, pot, communityCards, activeSeat } = req.body;

  try {
    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).send('Table not found');
    }

    // Update table properties
    if (players) table.players = players;
    if (pot !== undefined) table.pot = pot;
    if (communityCards) table.communityCards = communityCards;
    if (activeSeat !== undefined) table.activeSeat = activeSeat;

    await table.save();
    res.status(200).send(table);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error updating table');
  }
});

// 6. DELETE `/tables/:tableId` - Delete a table by ID
router.delete('/:tableId', async (req, res) => {
  const { tableId } = req.params;

  try {
    const table = await Table.findByIdAndDelete(tableId);
    if (!table) {
      return res.status(404).send('Table not found');
    }
    res.status(200).send(`Table ${table.tableName} deleted successfully.`);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error deleting table');
  }
});

module.exports = router;
// POST `/tables/:tableId/bet` - Place a bet
router.post('/:tableId/bet', async (req, res) => {
  const { tableId } = req.params;
  const { playerId, betAmount } = req.body;

  try {
    const table = await Table.findById(tableId);
    if (!table) return res.status(404).send('Table not found');

    // Find the player in the table
    const player = table.players.find(p => p._id.toString() === playerId);
    if (!player) return res.status(404).send('Player not found');

    // Check if player has enough chips
    if (player.chips < betAmount) {
      return res.status(400).send('Not enough chips to place the bet');
    }

    // Update the player's chips and the table's pot
    player.chips -= betAmount;
    table.pot += betAmount;

    // Move to the next seat
    table.activeSeat = (table.activeSeat + 1) % table.players.length;

    await table.save();
    res.status(200).send(table);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error placing bet');
  }
});
