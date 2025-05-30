const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const serverless = require("serverless-http");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = "mongodb+srv://renatoperas36:adventuretime36@cluster0.iluvg0w.mongodb.net/KantoKusina";
const CLOUDINARY_CLOUD_NAME = "dqxs4adrm";
const CLOUDINARY_API_KEY = "992441237856933";
const CLOUDINARY_API_SECRET = "eLl0H__kXiCbRH-nDbyCnpW0p-w";
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}
module.exports = app;
module.exports.handler = serverless(app)