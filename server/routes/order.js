const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// POST new order
router.post("/", async (req, res) => {
  try {
    const { userId, name, email, address, cart, total } = req.body;

    const newOrder = new Order({
      userId,
      name,
      email,
      address,
      items: cart,
      total,
      status: "pending",
      createdAt: new Date(),
    });

    await newOrder.save();
    res.status(201).json(newOrder);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed", error: err.message });
  }
});

module.exports = router;
