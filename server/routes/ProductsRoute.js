//* All routes related to club's LOGIN AND REGISTER

const express = require("express");
const Products = require("../models/ProductSchema");
const router = express.Router();

// Make a new route to post a new product to the database
router.post("/add", async (req, res) => {
  const { name, category, img, price, creationdate, expiredate } = req.body;
  try {
    console.log(req.body);
    const product = new Products({
      name,
      category,
      img,
      price,
      creationdate,
      expiredate,
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

router.patch("/updateproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedproduct = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updatedproduct);
    res.status(201).json(updatedproduct);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedproduct = await Products.findByIdAndDelete({ _id: id });
    console.log(deletedproduct);
    res.status(201).json(deletedproduct);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
