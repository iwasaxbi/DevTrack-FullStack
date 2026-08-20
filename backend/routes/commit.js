const express = require('express');
const router = express.Router();
const Commit = require('../models/Commit');
const authMiddleware = require('../middleware/auth');

// ==========================================
// @ROUTE: POST /api/commits
// @DESC: Log a new commit
// @ACCESS: Private
// ==========================================
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { message, branch, repository } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Commit message is required" });
    }

    const newCommit = new Commit({
      message,
      branch: branch || 'main',
      repository: repository || 'Core Engine',
      owner: req.user.userId // 🚀 Same secure logic that fixed our Tasks!
    });

    const savedCommit = await newCommit.save();
    res.status(201).json({ success: true, data: savedCommit });

  } catch (error) {
    console.error("Create Commit Error:", error);
    res.status(500).json({ success: false, message: "Server Error logging commit" });
  }
});

// ==========================================
// @ROUTE: GET /api/commits
// @DESC: Get all commits for the logged-in user
// @ACCESS: Private
// ==========================================
router.get('/', authMiddleware, async (req, res) => {
  try {
    const commits = await Commit.find({ owner: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: commits });
  } catch (error) {
    console.error("Fetch Commits Error:", error);
    res.status(500).json({ success: false, message: "Server Error fetching commits" });
  }
});

module.exports = router;