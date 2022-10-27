const UserModel = require("../models/user");
const nodemailer = require("nodemailer");

module.exports.signup = (req, res) => {
  console.log(req.body);

  const isthere = UserModel.findOne({ username: req.body.username })
    .then((result) => {
      console.log(result.username);
      res.send({ code: 201 });
      console.log(req.body.username);
      console.log(result.username);
    })
    .catch(() => {
      const newUser = new UserModel({
        type: "USER",
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        location: req.body.location,
        phone: req.body.phone,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        secretQ: req.body.secretQ,
        secretA: req.body.secretA,
      });
      newUser
        .save()
        .then(() => {
          res.send({ code: 200, message: "Signup success" });
        })
        .catch((err) => {
          res.send({ code: 500, message: "Signup Err" });
        });
    });
};

module.exports.signin = (req, res) => {
  console.log(req.body.email);

  UserModel.findOne({ username: req.body.username })
    .then((result) => {
      console.log(result, "11");

      if (result.password !== req.body.password) {
        res.send({ code: 404, message: "password wrong" });
      } else {
        if (result.type === "ADMIN") {
          res.send({
            name: result.name,
            username: result.username,
            code: 200,
            message: "admin",
            token: "hfgdhg",
          });
        } else {
          res.send({
            name: result.name,
            username: result.username,
            code: 200,
            message: "user",
            token: "hfgdhg",
          });
        }
      }
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
    });
};
module.exports.forgotPassword = (req, res) => {
  console.log(req.body.username);

  UserModel.findOne({ username: req.body.username })
    .then((result) => {
      console.log(result, "11");

      if (!result) {
        res.send({ code: 500, message: "user not found" });
      } else {
        res.send({
          username: result.username,
          code: 200,
          message: "username",
          token: "hfgdhg",
        });
      }
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
    });
};
module.exports.favquestion = (req, res) => {
  console.log(req.body.username);

  UserModel.findOne({ username: req.body.username })
    .then((result) => {
      console.log(result, "11");

      if (!(result.phone === req.body.phone && result.name === req.body.name)) {
        res.send({ code: 500, message: "user not found" });
      } else {
        res.send({
          username: result.username,
          secretQ: result.secretQ,
          code: 200,
          message: "username",
          token: "hfgdhg",
        });
      }
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
    });
};
module.exports.checkAnswer = (req, res) => {
  console.log(req.body.username);

  UserModel.findOne({ username: req.body.username })
    .then((result) => {
      console.log(result, "11");

      if (!(result.secretA === req.body.secretA)) {
        res.send({ code: 500, message: "user not found" });
      } else {
        res.send({
          username: result.username,
          code: 200,
          message: "username",
          token: "hfgdhg",
        });
      }
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
    });
};

module.exports.updatepassword = (req, res) => {
  console.log(req.body);

  UserModel.findOne({ username: req.body.username })
    .then((result) => {
      if (!(req.body.password === req.body.cpassword)) {
        res.send({ code: 500, message: "Passwords are not same." });
      } else {
        UserModel.updateOne(
          { username: result.username },
          { password: req.body.password }
        )
          .then((result) => {
            res.send({ code: 200, message: "Password updated" });
          })
          .catch((err) => {
            res.send({ code: 500, message: "Server err" });
          });
      }
    })

    .catch((err) => {
      res.send({ code: 500, message: "otp is wrong" });
    });
};
