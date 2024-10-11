const express = require('express');
const router = express.Router();
const Table = require('../models/tableModel');

// Generate dummy AI player names
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

// Route to create a new poker table
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

module.exports = router;
