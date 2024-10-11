// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/userModel'); // Import User model
const app = express();
const tableRoutes = require('./routes/tableRoutes'); // Import table routes


// Connect to MongoDB
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
app.use(express.static('public'));

// Start server
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
