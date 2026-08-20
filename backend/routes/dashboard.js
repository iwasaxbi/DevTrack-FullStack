const express = require('express');
const router = express.Router();

// 🚀 Teeno models import kiye jo tumne abhi banaye hain
const Project = require('../models/Project');
const Task = require('../models/Task');
const Commit = require('../models/Commit');

// 🚀 Tumhara authentication middleware (Path check kar lena agar alag ho)
// Note: Agar middleware ka naam kuch aur hai, toh isko update kar lena
const authMiddleware = require('../middleware/auth'); 

// ==========================================
// @ROUTE: GET /api/dashboard/stats
// @DESC: Get counts for Projects, Tasks, and Commits
// @ACCESS: Private (Only logged-in users)
// ==========================================
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    // Auth middleware se user ki ID mil jayegi
    const userId = req.user.id || req.user._id; 

    // Parallel processing for high performance (Senior SDE approach)
    // Promise.all use kiya hai taaki teeno queries ek sath run ho, time bache!
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