const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Dynamic CORS
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true); // Always allow the requesting origin
    },
    credentials: true,
  })
);

// DB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use(require("./routes/productRoutes"));
app.use(require("./routes/uploadRoutes"));  // Upload route sends Cloudinary URLs
app.use(require("./routes/cartRoutes"));
app.use(require("./routes/paymentRoutes"));
app.use(require("./routes/newsletterRoutes"));



// Root endpoint
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
