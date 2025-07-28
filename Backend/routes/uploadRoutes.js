import express from "express";
import multer from "multer";
import cloudinary from "../cloudinary.js";
import streamifier from "streamifier";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: upload a single file buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "ecommerce_products" },
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// Upload multiple images
router.post("/upload-multiple", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    // Upload all files to Cloudinary
    const urls = await Promise.all(req.files.map(file => uploadToCloudinary(file.buffer)));

    res.json({ success: true, images: urls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
