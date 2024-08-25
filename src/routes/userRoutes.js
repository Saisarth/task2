const express = require('express');
const { authenticateJWT } = require('../middleware/auth');
const AuthService = require('../services/authService');

const router = express.Router();
const authService = new AuthService();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authService.register(username, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/profile', authenticateJWT, (req, res) => {
  res.json(req.user);
});

module.exports = router;
