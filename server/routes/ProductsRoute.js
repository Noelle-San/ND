//* All routes related to club's LOGIN AND REGISTER

const express = require("express");
const Products = require("../models/ProductSchema");
const router = express.Router();

// Make a new route to post a new product to the database
router.post("/add", async (req, res) => {
  const { name, img, price } = req.body;
  try {
    const product = new Products({
      name,
      img,
      price,
    });
    await product.save();
    res
      .status(200)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// make a route to get all the products from the database
router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// make a route to get a particular product from the database with the help of it's id
router.get("/:id", async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
