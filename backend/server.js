const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🟢 Database Connection Logic
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`🟢 DATABASE CONNECTED: MongoDB Cluster is Live!`);
  })
  .catch((err) => {
    console.log(`🔴 DATABASE ERROR: Failed to connect.\n`, err);
  });

// ==========================================
// 🚀 API ROUTES (Linking the logic)
// ==========================================
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard'); 
const projectRoutes = require('./routes/project'); // 🚀 NEW: Project API imported

app.use('/api/auth', authRoutes); 
app.use('/api/dashboard', dashboardRoutes); 
app.use('/api/projects', projectRoutes); // 🚀 NEW: Project APIs '/api/projects' se shuru hongi

// Basic Test Route
app.get('/', (req, res) => {
  res.send('DevTrack Backend Engine is Live! 🚀');
});

// Define Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================`);
  console.log(`🚀 ENGINE STARTED: http://localhost:${PORT}`);
  console.log(`======================================\n`);
});