// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pokerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/users', userRoutes); // Use the user routes

// Serve static files
app.use(express.static('public'));

// Start server
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
