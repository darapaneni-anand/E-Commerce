const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get user's cart
router.get("/getcart/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ cart: user.cart || [] });
  } catch (err) {
    console.error("Get cart error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Save user's cart
router.post("/savecart", async (req, res) => {
  const { userId, cart } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { cart }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Cart saved successfully", cart: user.cart });
  } catch (err) {
    console.error("Save cart error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
