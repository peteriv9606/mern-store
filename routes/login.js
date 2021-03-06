const express = require("express");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded();
const bcrypt = require("bcrypt");
const UserModel = require("../UserModel");

module.exports = (app) => {
  app.post("/api/login", urlEncodedParser, async (req, res) => {
    console.log("POST /api/login");
    const user = await UserModel.findOne({ username: req.body.username });
    if (user) {
      const isValidPass = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPass) {
        res.status(200).send(user);
      } else res.status(200).send("Invalid password");
    } else res.status(200).send("User not found.");
  });
};
