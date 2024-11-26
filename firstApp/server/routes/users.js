const express = require("express");
const router = express.Router();
const db = require("../database");

// ลงทะเบียนผู้ใช้
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error registering user" });
    } else {
      res.status(201).json({ message: "User registered successfully" });
    }
  });
});

// ล็อกอิน
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT id FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error logging in" });
    } else if (results.length > 0) {
      res.status(200).json({ userId: results[0].id, message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  });
});

module.exports = router;