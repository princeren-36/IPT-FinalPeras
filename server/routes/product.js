const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");

// Cloudinary config
cloudinary.config({
  cloud_name: "dqxs4adrm",
  api_key: "992441237856933",
  api_secret: "eLl0H__kXiCbRH-nDbyCnpW0p-w"
});

// Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST create product with Cloudinary image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      // Upload buffer to Cloudinary
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            { folder: "ipt-finalperas" },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };
      const result = await streamUpload(req);
      imageUrl = result.secure_url;
    }
    const { name, price, category } = req.body;
    const newProduct = new Product({ name, price, image: imageUrl, category });
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err });
  }
});

// PUT update product
router.put("/:id", upload.single("image"), async (req, res) => {
  const { name, price, category } = req.body; // include category
  const update = { name, price, category };
  if (req.file) update.image = `/uploads/${req.file.filename}`;
  const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(product);
});

// DELETE product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
