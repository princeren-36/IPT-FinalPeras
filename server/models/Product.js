const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  category: String, // <-- Add this line
});

module.exports = mongoose.model("Product", productSchema);