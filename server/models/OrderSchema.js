// product schema
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    totalcost: {
      type: Number,
    },
    shipmentdate: {
      type: String,
    },
    creationdate: {
      type: String,
    },
    products: [
      {
        productid: {
          type: String,
        },
        name: {
          type: String,
        },
        img: {
          type: String,
        },
        price: {
          type: Number,
        },
        qty: {
          type: Number,
        },
        shipmentdate: {
          type: String,
        },
        totalprice: {
          type: Number,
        },
      },
    ],
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timetamps: true }
);

// module.exports = mongoose.models.Users || mongoose.model("Users", UserSchema);
module.exports =
  mongoose.models.orders || mongoose.model("orders", OrderSchema);
