const express = require('express');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const tableRoutes = require('./routes/tableRoutes'); // Import table routes

const app = express(); // Create an Express app
const server = http.createServer(app);
const io = socketIo(server); // Initialize Socket.IO

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/pokerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Use Routes
app.use('/users', userRoutes); // Use the user routes
app.use('/tables', tableRoutes); // Use the table routes

// Serve static files
app.use(express.static('public')); // Serve files from the "public" directory

// Socket.IO event handling
let tableState = {
  players: {},
  pot: 0,
  communityCards: [],
  inProgress: false,
};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Send the current table state to the newly connected client
  socket.emit('tableState', tableState);

  // Handle player joining a seat
  socket.on('playerJoin', ({ seatNumber, playerName }) => {
    if (!tableState.players[seatNumber]) {
      tableState.players[seatNumber] = { name: playerName, chips: 1000, seatNumber, status: 'active' };
      io.emit('tableState', tableState); // Broadcast the updated table state
    }
  });

  // Handle starting a new game
  socket.on('startGame', () => {
    if (!tableState.inProgress) {
      tableState.inProgress = true;
      tableState.communityCards = dealCommunityCards(); // Generate community cards
      io.emit('gameStarted', tableState); // Broadcast the game start event
    }
  });

  // Handle player betting actions
  socket.on('playerAction', ({ seatNumber, action, amount }) => {
    if (tableState.players[seatNumber]) {
      let player = tableState.players[seatNumber];
      switch (action) {
        case 'raise':
        case 'call':
          if (player.chips >= amount) {
            player.chips -= amount;
            tableState.pot += amount;
          }
          break;
        case 'fold':
          player.status = 'folded';
          break;
      }
      io.emit('tableState', tableState); // Update all clients
    }
  });

  // Handle player disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Function to deal random community cards
const dealCommunityCards = () => {
  const suits = ['♠', '♣', '♦', '♥'];
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let deck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push(`${rank}${suit}`);
    });
  });

  // Shuffle the deck
  deck = deck.sort(() => Math.random() - 0.5);
  return deck.slice(0, 5); // Return 5 cards for the community
};

const PORT = 3000;
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
