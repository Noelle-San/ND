const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./controller/user");

const DB =
  "mongodb+srv://tamaldas:tamaldas69@cluster0.qtpuyfr.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose.connect(DB, (err) => {
//   if (err) {
//     console.log("DB Err.");
//   } else {
//     console.log("DB Connected.");
//   }
// });
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.post("/signup", userController.signup);
app.post("/signin", userController.signin);
app.post("/forgotPassword", userController.forgotPassword);
app.post("/fav-q", userController.favquestion);
app.post("/check-answer", userController.checkAnswer);
app.post("/update-password", userController.updatepassword);

app.listen(5000, () => {
  console.log(`Backend Running At Port 5000`);
});
