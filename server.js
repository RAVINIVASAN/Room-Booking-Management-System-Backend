const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require("dns");
require("dotenv").config();

// DNS fix (optional – safe to keep)
try {
  dns.setServers(["8.8.8.8"]);
  console.log("DNS servers set to:", dns.getServers());
} catch (e) {
  console.error("Failed to set DNS servers:", e.message);
}

const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

// root route
app.get("/", (req, res) => {
  res.status(200).send("Room Booking API is running 🚀");
});

// health check (recommended for Render)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// fallback for undefined routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
});

// mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
