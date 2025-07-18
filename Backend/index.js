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
const bcrypt = require("bcrypt");
const User = require("./models/User"); 



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
app.post("/upload", upload.single('image'), (req, res) => {
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

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with token and user info (without password)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      }
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4. Send token and user data
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
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
