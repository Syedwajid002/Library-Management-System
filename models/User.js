const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,      // Ensure email uniqueness to avoid duplicate users
    lowercase: true,   // Store emails in lowercase for consistency
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ['Admin', 'Member'], // Match roles used in your controllers (case-sensitive)
    default: 'Member',          // Default role is 'Member', not 'user'
  }
}, {
  timestamps: true  // To have createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('User', userSchema);
