const express = require('express');
const router = express.Router();

// 🚀 Teeno models import kiye
const Project = require('../models/Project');
const Task = require('../models/Task');
const Commit = require('../models/Commit');

// 🚀 Authentication middleware
const authMiddleware = require('../middleware/auth'); 

// ==========================================
// @ROUTE: GET /api/dashboard/stats
// @DESC: Get counts for Projects, Tasks, and Commits
// @ACCESS: Private
// ==========================================
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    // 🚀 FIX: Yahan 'req.user.userId' aayega, kyuki token mein wahi naam hai!
    const userId = req.user.userId; 

    // Parallel processing for high performance
    const [projectCount, taskCount, commitCount] = await Promise.all([
      Project.countDocuments({ owner: userId }),
      Task.countDocuments({ owner: userId }),
      Commit.countDocuments({ owner: userId })
    ]);

    // Data frontend ko bhej do
    res.status(200).json({
      success: true,
      data: {
        projects: projectCount,
        tasks: taskCount,
        commits: commitCount
      }
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ success: false, message: "Server Error fetching dashboard stats" });
  }
});

module.exports = router;