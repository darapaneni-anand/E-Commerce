const port  = 4000;
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer  = require("multer");
const path = require("path");
const cors = require("cors");
const uri = process.env.MONGO_URL;
const Product = require("./models/Product");

app.use(express.json());
app.use(cors());
console.log('Mongo URL:', process.env.MONGODB_URI);

mongoose.connect(uri).then(()=>console.log("db connected"));

app.get("/",(req,res)=>
{
    res.send("Express App is Running");
})

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    }
});

const upload = multer({ storage: storage });

// 2. Serve static images
app.use("/images", express.static("upload/images"));

// 3. Upload endpoint
app.post("/upload", upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});



app.post("/addproduct", async (req, res) => {

  let products = await Product.find({});
  let id;
  if(products.length>0)
  {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id =last_product.id+1;
  }
  else{
    id=1;
  }
  try {
    // Create a new Product using values from req.body
    const newProduct = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      date: req.body.date || Date.now(), // Optional: allow client to send date
      available: req.body.available
    });

    await newProduct.save();

    res.json({
      success: 1,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: 0,
      message: err.message
    });
  }
});

app.post('/removeproduct',async(req,res) =>{
  await Product.findOneAndDelete({id:req.body.id});
  console.log("removed");
  res.json({
    success:true,
    name:req.body.name
  })
});

app.get('/allproducts',async(req,res)=>
{
  let products = await Product.find({});
  res.send(products);
});

app.listen(port,(error)=>
    {
        if(!error)
            {
                console.log("Server Running on port"+port)
            }
        else{
            console.log("Error:" +error);
        }
    })
