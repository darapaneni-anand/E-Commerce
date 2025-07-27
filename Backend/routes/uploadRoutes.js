const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: 0, message: "No file uploaded" });

  res.json({
  success: 1,
  image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
});

});

module.exports = router;
