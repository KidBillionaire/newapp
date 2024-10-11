const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import JWT auth middleware

// Route to verify if the API is working
router.get('/test', (req, res) => {
  res.send('User route is working!');
});


// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    // Create a new user instance and save it
    const newUser = new (require('../models/userModel'))({ username, email, password });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

    // Create a new user instance
    const newUser = new (require('../models/userModel'))({
      username,
      email,
      totalWins: totalWins || 0,
      totalLosses: totalLosses || 0,
      settings: settings || {},
      chips: chips || 1000,
      pokerHands: pokerHands || [],
    });

    console.log('New User Object:', newUser); // Log the new user object to be saved

    // Save the new user to the database
    await newUser.save();

              try {
                console.log('User created successfully:', newUser); // Confirmation log after user is saved
                res.status(201).json(newUser);
              } catch (error) {
                console.error('Error creating user:', error); // Log detailed error
                res.status(400).json({ message: 'Error creating user', error: error.message });
              }
            }
          }
        }
      // READ all users
      router.get('/', async (req, res) => {
        try {
          const users = await (require('../models/userModel')).find();
          res.status(200).json(users);
        } catch (error) {
          console.error('Error retrieving users:', error);
          res.status(400).json({ message: 'Error retrieving users', error: error.message });
        }
      });

    // READ a specific user by ID
    router.get('/:id', async (req, res) => {
  try {
    const user = await (require('../models/userModel')).findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(400).json({ message: 'Error retrieving user', error: error.message });
  }
});

// UPDATE a specific user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await (require('../models/userModel')).findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

// DELETE a specific user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await (require('../models/userModel')).findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(400).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;
