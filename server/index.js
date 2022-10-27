const connectToMongo = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./controller/user");
const dotenv = require("dotenv");

connectToMongo();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/authuser", require("./routes/AuthRoute"));
app.use("/admin", require("./routes/AdminRoute"));
app.use("/products", require("./routes/ProductsRoute"));
app.use("/user", require("./routes/OrdersRoute"));

app.listen(5000, () => {
  console.log(`Backend Running At Port 5000`);
});
