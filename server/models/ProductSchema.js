// product schema
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    img: {
      type: String,
    },
    price: {
      type: Number,
    },
    creationdate: {
      type: Date,
    },
    expiredate: {
      type: Date,
    },
  },
  { timetamps: true }
);

module.exports =
  mongoose.models.product || mongoose.model("product", ProductSchema);
