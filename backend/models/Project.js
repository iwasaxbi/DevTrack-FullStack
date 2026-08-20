const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { 
      type: String, 
      enum: ['Active', 'Paused', 'Completed'], 
      default: 'Active' 
    },
    // Ye line ensure karegi ki project kis user ka hai
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);