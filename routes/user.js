const express = require("express");
const router = express.Router();
const UserModel = require("../UserModel");

module.exports = (app) => {
  app.get("/api/user/:_id", (req, res) => {
    console.log("GET /api/user/:_id", req.params);
    UserModel.findById(req.params._id, (err, user) => {
      if (err) console.error(err);
      else {
        if (user) res.send(user);
        else res.send("user not found");
      }
    });
  });
};
