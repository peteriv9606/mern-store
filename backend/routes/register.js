const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded();
const UserModel = require("../models/userModel");
module.exports = (app) => {
  app.post("/register", urlEncodedParser, (req, res) => {
    console.log("POST /register");
    UserModel.find({ username: req.body.username }, (err, data) => {
      if (err) console.error(err);
      else {
        if (data[0]) {
          //user found?
          res.status(200);
          res.send("Username already taken");
        } else {
          //user NOT found
          const newUser = UserModel(req.body);
          newUser.save((error) => {
            if (error) console.error(error);
            else {
              res.status(201);
              res.json("User created successfuly");
            }
          });
        }
      }
    });
  });
};
