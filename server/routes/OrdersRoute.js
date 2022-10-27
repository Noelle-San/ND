//* All routes related to club's LOGIN AND REGISTER

const express = require("express");
const Users = require("../models/user");
const Orders = require("../models/OrderSchema");
const router = express.Router();

// Make a route to add a user with email to the database
router.post("/adduser", async (req, res) => {
  try {
    const user = new Users({
      email: req.body.email,
      name: req.body.name,
    });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// make a route to add a single product to the cart
router.post("/addproducttocart", async (req, res) => {
  try {
    const { email, name, cartproducts } = req.body;
    const newuser = {};
    let searcheduser = await Users.findOne({ email: email });

    if (searcheduser) {
      if (email) {
        newuser.email = email;
      }

      if (name) {
        newuser.name = name;
      }

      if (cartproducts) {
        newuser.cartproducts = cartproducts;
      }

      let u = await Users.findOneAndUpdate({ email: email }, newuser);

      return res.status(200).json({ sucess: "sucess" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

// make a route to get the details of an user with email as input
router.post("/getuser", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/removeallproductsfromcart", async (req, res) => {
  try {
    const { email, name, cartproducts } = req.body;
    const newuser = {};
    let searcheduser = await Users.findOne({ email: email });
    const emptycart = [];

    if (searcheduser) {
      newuser.cartproducts = emptycart;

      let u = await Users.findOneAndUpdate({ email: email }, newuser);

      return res.status(200).json({ sucess: "sucess" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/placeorder", async (req, res) => {
  try {
    const order = new Orders({
      email: req.body.email,
      totalcost: req.body.totalcost,
      shipmentdate:
        req.body.products[req.body.products.length - 1].shipmentdate,
      creationdate: req.body.creationdate,
      products: req.body.products,
    });
    const savedUser = await order.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/getorders", async (req, res) => {
  try {
    const orders = await Orders.find({ email: req.body.email });

    return res.status(200).json(orders);

    // res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

// get the details of a particular order with the help of it's id as an input

router.post("/getorderdetails", async (req, res) => {
  try {
    const orderdetails = await Orders.findById(req.body.id);
    return res.json(orderdetails);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
