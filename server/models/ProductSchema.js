// product schema
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    img: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timetamps: true }
);

module.exports =
  mongoose.models.product || mongoose.model("product", ProductSchema);
