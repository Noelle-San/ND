const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    type: String,
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: String,
    },
    sex: {
      type: String,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    secretQ: {
      type: String,
    },
    secretA: {
      type: String,
    },

    cartproducts: [
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
  },
  { timetamps: true }
);

// module.exports = mongoose.models.Users || mongoose.model("Users", UserSchema);
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
