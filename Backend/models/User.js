const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
});

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    cartData: [cartItemSchema], // ✅ Stores cart items here
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
