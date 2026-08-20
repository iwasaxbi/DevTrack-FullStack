const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios'); // Note: axios package backend mein bhi zaroori hai Google se data lene ke liye
const User = require('../models/User'); 

const router = express.Router();

// ==========================================
// 1. SIGNUP API (Existing)
// ==========================================
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists! Please login.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      authProvider: 'local'
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ message: 'Account created successfully!', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error during Signup' });
  }
});

// ==========================================
// 2. LOGIN API (Existing)
// ==========================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ message: 'Login successful!', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error during Login' });
  }
});

// ==========================================
// 3. GOOGLE AUTH API (NEW 🚀)
// ==========================================
router.post('/google', async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ message: 'Google Access Token is missing!' });
    }

    // Google ke server se user ki profile details fetch karo using Access Token
    const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { sub: googleId, email, name } = googleResponse.data;

    // Check karo kya ye email pehle se database mein hai?
    let user = await User.findOne({ email });

    if (user) {
      // Agar user pehle se local signup kiya tha aur ab Google se aa rha hai, toh googleId link kardo
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
        await user.save();
      }
    } else {
      // Agar bilkul naya user hai, toh database mein naya account bana do
      user = new User({
        name,
        email,
        googleId,
        authProvider: 'google'
      });
      await user.save();
    }

    // Apni app ka JWT Token generate karo
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ 
      message: 'Google Authentication Successful!', 
      token,
      user: { name: user.name, email: user.email }
    });

  } catch (err) {
    console.error('Google Auth Error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Server Error during Google Authentication' });
  }
});

module.exports = router;