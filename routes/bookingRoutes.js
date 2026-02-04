const express = require("express");
const Booking = require("../models/Booking");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * BOOK ROOM (USER)
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { room, startTime, endTime } = req.body;

    // Overlapping check
    const conflict = await Booking.findOne({
      room,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime },
        },
      ],
    });

    if (conflict) {
      return res
        .status(400)
        .json({ message: "Room already booked for this time slot" });
    }

    const booking = await Booking.create({
      user: req.user.id,
      room,
      startTime,
      endTime,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * USER - Own bookings
 */
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("room");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * ADMIN - All bookings
 */
router.get("/", authMiddleware, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("room");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
