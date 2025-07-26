const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // put your test key ID in .env
  key_secret: process.env.RAZORPAY_KEY_SECRET, // put your test secret in .env
});

// Create order route
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body; // amount in INR
    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



module.exports = router;
