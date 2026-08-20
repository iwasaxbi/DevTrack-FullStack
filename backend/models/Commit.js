const mongoose = require('mongoose');

const commitSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true },
    repoName: { type: String, trim: true, default: 'DevTrack' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Commit', commitSchema);