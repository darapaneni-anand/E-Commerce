// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Static file serving
app.use("/images", express.static("upload/images"));

// Routes
app.use(require("./routes/authRoutes"));
app.use(require("./routes/productRoutes"));
app.use(require("./routes/uploadRoutes"));


app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
