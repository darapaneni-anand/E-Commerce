const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Add item to cart
router.post("/add-to-cart", async (req, res) => {
    console.log("🛒 /add-to-cart request body:", req.body);
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity == null) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const existingIndex = user.cartData.findIndex(item => item.productId === productId);

    if (existingIndex !== -1) {
      user.cartData[existingIndex].quantity += quantity;
    } else {
      user.cartData.push({ productId, quantity });
    }

    await user.save();
    res.json({ success: true, cartData: user.cartData });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🔁 Get cart data
router.get("/get-cart/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, cartData: user.cartData });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ♻️ Sync cart (replace entire cartData)
router.post("/update-cart", async (req, res) => {
  const { userId, cartData } = req.body;

  console.log("🔄 /update-cart request body:", req.body);

  if (!userId || !Array.isArray(cartData)) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartData: cartData },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: updatedUser.cartData });
  } catch (err) {
    console.error("🔥 Update cart error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
