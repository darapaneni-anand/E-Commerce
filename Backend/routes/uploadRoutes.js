const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Ensure upload folder exists
const uploadDir = path.join(__dirname, "../upload/images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Route to handle multiple image uploads (1 main + up to 4 thumbnails)
router.post("/upload-multiple", upload.array("images", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: 0, message: "No files uploaded" });
  }

  const urls = req.files.map(
    (file) => `${req.protocol}://${req.get("host")}/images/${file.filename}`
  );

  res.json({
    success: 1,
    images: urls,
  });
});

module.exports = router;
