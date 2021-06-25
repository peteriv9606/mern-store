const express = require("express");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded();
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
module.exports = (app) => {
  app.post("/register", urlEncodedParser, async (req, res) => {
    console.log("POST /register");
    const existing = await UserModel.findOne({ username: req.body.username });
    if (existing) {
      res.status(200).send("Username Already Taken");
      return 0;
    }
    //user not found - create a new one
    const user = UserModel(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user
      .save()
      .then((doc) => res.status(201).send("User Created Successfuly!"));
  });
};
