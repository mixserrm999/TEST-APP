const express = require("express");
const router = express.Router();
const db = require("../database");

// ดึงโพสต์ทั้งหมด
router.get("/", (req, res) => {
  const query = `
    SELECT posts.id, posts.content, posts.created_at, users.username, users.id AS userId
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching posts" });
    } else {
      res.status(200).json(results);
    }
  });
});

// เพิ่มโพสต์ใหม่
router.post("/", (req, res) => {
  const { userId, content } = req.body;

  if (!userId || !content) {
    return res.status(400).json({ message: "userId and content are required" });
  }

  const insertQuery = "INSERT INTO posts (user_id, content) VALUES (?, ?)";
  const selectQuery = `
    SELECT posts.id, posts.content, posts.created_at, users.username, users.id AS userId
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = ?
  `;

  // เพิ่มโพสต์ใหม่
  db.query(insertQuery, [userId, content], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error adding post" });
    } else {
      const newPostId = result.insertId;

      // ดึงข้อมูลโพสต์ใหม่ที่เพิ่มเข้าไป
      db.query(selectQuery, [newPostId], (err, results) => {
        if (err) {
          res.status(500).json({ message: "Error fetching new post" });
        } else if (results.length === 0) {
          res.status(404).json({ message: "New post not found" });
        } else {
          res.status(201).json(results[0]); // ส่งข้อมูลโพสต์ใหม่กลับ
        }
      });
    }
  });
});

module.exports = router;