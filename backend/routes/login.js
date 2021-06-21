const express = require("express");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded();
const UserModel = require("../models/userModel");
module.exports = (app) => {
  app.post("/login", urlEncodedParser, (req, res) => {
    console.log("POST /login");
    console.log(req.body);
    UserModel.findOne({ username: req.body.username }, (err, user) => {
      if (err) console.error(err);
      else {
        if (user) {
          //user found
          if (user.password === req.body.password) {
            res.send(user);
          } else {
            res.send("incorrect password");
          }
        } else {
          res.send("username not found");
        }
      }
    });
  });
};
