import mongoose from 'mongoose';

// Define a schema for tracking poker hands played by each user
const pokerHandSchema = new mongoose.Schema({
  hand: { type: String, required: true },
  result: { type: String, required: true, enum: ['win', 'loss', 'draw'] },
});

// Define a schema for user settings and profile data
const userSettingsSchema = new mongoose.Schema({
  emailNotifications: { type: Boolean, default: true },
  smsNotifications: { type: Boolean, default: false },
  profileVisibility: { type: String, enum: ['public', 'private'], default: 'public' },
  theme: { type: String, default: 'light' }, // Options: light, dark, etc.
  profilePicture: { type: String, default: '' }, // URL for profile picture
  bio: { type: String, default: '' }, // Short bio field
  location: { type: String, default: '' }, // Location or address
});

// Define the main user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  pokerHands: [pokerHandSchema], // Array to store hands played
  totalWins: { type: Number, default: 0 },
  totalLosses: { type: Number, default: 0 },
  settings: { type: userSettingsSchema, default: () => ({}) }, // Embed settings schema
  createdAt: { type: Date, default: Date.now }, // Track when user was created
  updatedAt: { type: Date, default: Date.now }, // Track when user was last updated
});

// Middleware to update `updatedAt` before each save operation
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('User', userSchema);
