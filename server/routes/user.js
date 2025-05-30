const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "User exists" });

    const user = await User.create({ username, password, email, role });
    res.json({ user });
  } catch {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ user });
});

// GET all users (for admin panel)
router.get("/all", async (req, res) => {
  try {
    // Only return safe fields (remove email if not used)
    const users = await User.find({}, { username: 1, role: 1 });
    res.status(200).json(users);
  } catch (err) {
    console.error('Failed to fetch users:', err);
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
});

// DELETE user by id (for admin panel)
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user', error: err });
  }
});

module.exports = router;
