const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    // 🚀 FIX: 'Pending' ki jagah 'To Do' kar diya taaki Frontend se match ho jaye
    status: { 
      type: String, 
      enum: ['To Do', 'In Progress', 'Done'], 
      default: 'To Do' 
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);