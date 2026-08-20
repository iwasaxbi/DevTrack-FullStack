const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // Naya Name field add kiya gaya hai
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function() {
        return this.authProvider === 'local';
      }
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local'
    },
    googleId: {
      type: String,
      default: null
    }
  },
  { 
    timestamps: true 
  }
);

module.exports = mongoose.model('User', userSchema);