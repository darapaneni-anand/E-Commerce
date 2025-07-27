const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Multer middleware
const upload = multer({ storage });

// Upload multiple images (main + thumbnails)
router.post("/upload-multiple", upload.array("images", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: 0, message: "No files uploaded" });
  }

  const imageUrls = req.files.map(
    (file) => `${req.protocol}://${req.get("host")}/images/${file.filename}`
  );

  res.json({ success: 1, images: imageUrls });
});

module.exports = router;
