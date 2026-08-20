const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

// ==========================================
// @ROUTE: POST /api/tasks
// @DESC: Create a new task
// @ACCESS: Private
// ==========================================
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, status, priority, projectId } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Task title is required" });
    }

    const newTask = new Task({
      title,
      description,
      status: status || 'To Do',
      priority: priority || 'Medium',
      project: projectId || null, // Future proof: agar kisi specific project se link karna ho
      owner: req.user.userId // 🚀 Pichli baar wali error yahan aane hi nahi di!
    });

    const savedTask = await newTask.save();
    res.status(201).json({ success: true, data: savedTask });

  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ success: false, message: "Server Error creating task" });
  }
});

// ==========================================
// @ROUTE: GET /api/tasks
// @DESC: Get all tasks for the logged-in user
// @ACCESS: Private
// ==========================================
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    console.error("Fetch Tasks Error:", error);
    res.status(500).json({ success: false, message: "Server Error fetching tasks" });
  }
});

module.exports = router;