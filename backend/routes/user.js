const express = require("express");
const router = express.Router();

const UserModel = require("../models/UserModel");
module.exports = (app) => {
  app.get("/user/:_id", (req, res) => {
    console.log(req.params);
    UserModel.findById(req.params._id, (err, user) => {
      if (err) console.error(err);
      else {
        if (user) res.send(user);
        else res.send("user not found");
      }
    });
  });
};
