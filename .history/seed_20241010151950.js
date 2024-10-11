// seed.js
const mongoose = require('mongoose');
const User = require('./models/userModel');  // Adjust the path if necessary

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pokerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Define sample users
const sampleUsers = [
  {
    username: 'JohnDoe',
    pokerHands: [
      { hand: 'A♠ K♣', result: 'Win' },
      { hand: 'Q♦ J♥', result: 'Lose' }
    ],
    totalWins: 5,
    totalLosses: 2
  },
  {
    username: 'JaneDoe',
    pokerHands: [
      { hand: 'K♠ Q♠', result: 'Win' },
      { hand: 'A♣ 10♠', result: 'Win' }
    ],
    totalWins: 3,
    totalLosses: 1
  }
];

// Insert sample data
User.insertMany(sampleUsers)
  .then(() => {
    console.log('Sample data inserted successfully!');
    mongoose.connection.close();  // Close the connection after insertion
  })
  .catch(err => {
    console.error('Error inserting sample data', err);
  });
