// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for getting all users and their poker hands
router.get('/', userController.getAllUsers);

module.exports = router;
