//* All routes related to club's LOGIN AND REGISTER

const express = require("express");
const UserModel = require("../models/user");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/add", async (req, res) => {
  const user = req.body;

  // check if user already exists in the database with the same phone number
  const userExists = await UserModel.findOne({ phone: user.phone });

  if (userExists) {
    return res.json({ exists: true, user });
  }

  const newUser = new UserModel(user);

  try {
    await newUser.save();
    return res.status(201).json({ exists: false, newUser });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    //const user = await User.find({_id: req.params.id });
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  let user = req.body;
  const editUser = new UserModel(user);

  try {
    await UserModel.updateOne({ _id: req.params.id }, editUser);
    res.status(201).json(editUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await UserModel.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "USer deleted Sucesfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

module.exports = router;
