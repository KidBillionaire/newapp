const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const tableRoutes = require('./routes/tableRoutes'); // Import table routes

const app = express(); // Create an Express app

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/pokerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json()); // Parse incoming JSON requests


// Serve static files
app.use(express.static('public')); // Serve files from the "public" directory

// Use Routes
app.use('/users', userRoutes); // Use the user routes
app.use('/tables', tableRoutes); // Use the table routes


// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
