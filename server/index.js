// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const serverless = require("serverless-http");

// Import routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");  // Ensure this file exists and is correct

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection Configuration
const MONGODB_URI = "mongodb+srv://renatoperas36:adventuretime36@cluster0.iluvg0w.mongodb.net/KantoKusina";  // MongoDB URI directly here

// Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = "dqxs4adrm";  // Cloudinary cloud name
const CLOUDINARY_API_KEY = "992441237856933";  // Cloudinary API Key
const CLOUDINARY_API_SECRET = "eLl0H__kXiCbRH-nDbyCnpW0p-w";  // Cloudinary API Secret

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // Automatically parse JSON requests
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files (e.g., images) in /uploads folder

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)  // Use the directly defined MongoDB URI
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/user", userRoutes);  // Handle user-related routes
app.use("/products", productRoutes);  // Handle product-related routes
app.use("/orders", orderRoutes);  // Handle order-related routes

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;  // Export app for serverless platforms (like Vercel, if needed)
module.exports.handler = serverless(app)