const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,  // ✅ Make email unique
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
 
  
);

module.exports = mongoose.model("User", userSchema);
