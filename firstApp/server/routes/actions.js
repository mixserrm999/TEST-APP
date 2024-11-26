const express = require("express");
const router = express.Router();
const db = require("../database");

// เพิ่มการกระทำ (ถูกใจหรือแชร์)
router.post("/", (req, res) => {
  const { postId, userId, actionType } = req.body;
  const query = "INSERT INTO post_actions (post_id, user_id, action_type) VALUES (?, ?, ?)";
  db.query(query, [postId, userId, actionType], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error recording action" });
    } else {
      res.status(201).json({ message: `${actionType} added successfully` });
    }
  });
});

// ดึงจำนวนถูกใจหรือแชร์ของโพสต์
router.get("/:postId", (req, res) => {
  const { postId } = req.params;
  const query = `
    SELECT action_type, COUNT(*) AS count
    FROM post_actions
    WHERE post_id = ?
    GROUP BY action_type
  `;
  db.query(query, [postId], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error fetching actions" });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = router;