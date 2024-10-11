const express = require('express');
const router = express.Router();
const Table = require('../models/tableModel'); // Assuming you create a Table model (we’ll do this in the next step)

// Route to create a new poker table
router.post('/', async (req, res) => {
  const { tableName, numSeats, tableType } = req.body;

  try {
    const newTable = new Table({ tableName, numSeats, tableType });
    await newTable.save();
    res.status(201).send(newTable);
  } catch (error) {
    res.status(400).send('Error creating table');
  }
});

module.exports = router;
