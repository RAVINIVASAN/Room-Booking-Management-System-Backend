const express = require("express");
const Room = require("../models/Room");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * CREATE ROOM (ADMIN)
 */
router.post("/", authMiddleware, adminOnly, async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET ALL ROOMS (USER & ADMIN)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
