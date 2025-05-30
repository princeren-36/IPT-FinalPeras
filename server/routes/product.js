const express = require("express");
const Product = require("../models/Product");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();
cloudinary.config({
  cloud_name: "dqxs4adrm",
  api_key: "992441237856933",
  api_secret: "eLl0H__kXiCbRH-nDbyCnpW0p-w",
});
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) { cb(null, true); } else { cb(new Error('Only image files are allowed!'), false); }
  },
});
const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await streamUpload(req);
      imageUrl = result.secure_url;
    }
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category, image: imageUrl });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to add product" });
  }
});
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = req.body.image;
    if (req.file) {
      const result = await streamUpload(req);
      imageUrl = result.secure_url;
    }
    const { name, price, category } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, image: imageUrl },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});
module.exports = router;
