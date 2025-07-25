const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);

// DB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Static files (if you have image uploads)
app.use("/images", express.static("upload/images"));

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use(require("./routes/productRoutes"));
app.use(require("./routes/uploadRoutes"));
app.use(require("./routes/cartRoutes"));
app.use(require("./routes/paymentRoutes"));

// Root endpoint
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
