const mongoose = require("mongoose");

module.exports = mongoose.model("User", {
  type: String,
  name: String,
  age: String,
  sex: String,
  location: String,
  phone: String,
  email: String,
  username: String,
  password: String,
  secretQ: String,
  secretA: String,
});
