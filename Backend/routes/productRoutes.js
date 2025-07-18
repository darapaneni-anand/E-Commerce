const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// Add product
router.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  try {
    const newProduct = new Product({ ...req.body, id });
    await newProduct.save();
    res.json({ success: 1, message: "Product created", data: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: 0, message: err.message });
  }
});

// Remove product
router.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
});

// Get all products
router.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

module.exports = router;
