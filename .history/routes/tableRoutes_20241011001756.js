const Table = require('../models/tableModel'); // Import the Table model
const User = require('../models/userModel'); // Import the User model

// 1. Create a New Table
router.post('/', async (req, res) => {
    const { tableName, numSeats, tableType, smallBlind = 10, bigBlind = 20 } = req.body; // Defaults

    // Input validation
    if (!tableName || !numSeats || !tableType) {
        return res.status(400).json({ message: 'Table name, number of seats, and table type are required.' });
    }

    try {
        const newTable = new Table({ tableName, numSeats, tableType, smallBlind, bigBlind });
        await newTable.save();
        res.status(201).json({
            message: 'Table created successfully',
            table: newTable
        });
    } catch (error) {
        console.error('Error creating table:', error);
        res.status(500).json({ message: 'Error creating table' });
    }
});

// 2. Add a Player to a Table
router.post('/:tableId/addPlayer', async (req, res) => {
  const { userId, seatNumber, chips } = req.body;

  try {
    // Step 1: Fetch the table by its ID
    const table = await Table.findById(req.params.tableId);
    if (!table) {
      console.error(`Table not found: ${req.params.tableId}`);
      return res.status(404).json({ message: 'Table not found' });
    }

    // Step 2: Fetch the user by its ID
    const user = await User.findById(userId);
    if (!user) {
      console.error(`User not found: ${userId}`);
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 3: Check if the seat is already occupied
    const seatOccupied = table.players.some(player => player.seatNumber === seatNumber);
    if (seatOccupied) {
      console.error(`Seat number ${seatNumber} is already occupied on table: ${req.params.tableId}`);
      return res.status(400).json({ message: `Seat ${seatNumber} is already occupied` });
    }

    // Step 4: Add the player to the table's players array
    const newPlayer = {
      userId: user._id,
      username: user.username,
      chips: parseInt(chips, 10), // Ensure chips is a number
      seatNumber: parseInt(seatNumber, 10), // Ensure seatNumber is a number
      status: 'active',
      cards: [],
      catch (error) {
        console.error('Error adding player:', error.message); // Log the error message
        res.status(500).json({ message: 'Error adding player', error: error.message });
    }
    
    
    };

    console.log(`Adding player: ${user.username} to seat number: ${seatNumber} with ${chips} chips.`);
    table.players.push(newPlayer);

    // Step 5: Update the user's currentTable field
    user.currentTable = table._id;

    // Save both the user and table documents
    await user.save();
    await table.save();

    console.log(`Player ${user.username} added successfully to table: ${table.tableName}`);
    res.status(200).json(table);
  } catch (error) {
    console.error('Error adding player:', error);
    res.status(500).json({ message: 'Error adding player', error: error.message });
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
  const { playerCards, communityCards, stage } = req.body; // Assuming stage indicates which set of cards to deal
  try {
    const table = await Table.findById(req.params.tableId);
    if (!table) return res.status(404).send('Table not found');

    // Assign cards to each player
    table.players.forEach(player => {
      if (playerCards[player.userId]) {
        player.cards = playerCards[player.userId]; // Assign cards based on input
      }
    });

    // Check the stage and deal community cards accordingly
    if (stage === 'flop') {
      // Deal the flop (3 cards)
      table.boardCards = communityCards; // Expect communityCards to be an array of 3 cards for the flop
    } else if (stage === 'turn') {
      // Deal the turn (1 card)
      if (communityCards.length > 0) {
        table.boardCards.push(communityCards[0]); // Expect communityCards to contain the turn card
      }
    } else if (stage === 'river') {
      // Deal the river (1 card)
      if (communityCards.length > 0) {
        table.boardCards.push(communityCards[0]); // Expect communityCards to contain the river card
      }
    }

    // Update the table status to 'in-progress'
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

