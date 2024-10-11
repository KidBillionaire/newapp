const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // This must be present
  totalWins: { type: Number, default: 0 },
  totalLosses: { type: Number, default: 0 },
  chips: { type: Number, default: 1000 },
  dateJoined: { type: Date, default: Date.now }
});


// Pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare the entered password with the hashed password
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT for the user
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, username: this.username }, 'secretKey', { expiresIn: '1h' });
};

// Correctly export the model
const User = mongoose.model('User', userSchema);
module.exports = User;
