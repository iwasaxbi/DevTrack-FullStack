const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authMiddleware = require('../middleware/auth');

// ==========================================
// @ROUTE: POST /api/projects
// @DESC: Create a new project
// @ACCESS: Private (Only logged-in users)
// ==========================================
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({ success: false, message: "Project title is required" });
    }

    // Naya project banao aur current user ki ID attach karo
    const newProject = new Project({
      title,
      description,
      status: status || 'Active',
      owner: req.user.id || req.user._id // Token se user ID aayegi
    });

    const savedProject = await newProject.save();
    res.status(201).json({ success: true, data: savedProject });

  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ success: false, message: "Server Error creating project" });
  }
});

// ==========================================
// @ROUTE: GET /api/projects
// @DESC: Get all projects for the logged-in user
// @ACCESS: Private
// ==========================================
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Database se sirf current user ke projects find karo (newest first)
    const projects = await Project.find({ owner: req.user.id || req.user._id }).sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.error("Fetch Projects Error:", error);
    res.status(500).json({ success: false, message: "Server Error fetching projects" });
  }
});

module.exports = router;