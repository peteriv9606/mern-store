const express = require("express");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded();
const UserModel = require("../models/UserModel");
module.exports = (app) => {
  app.get("/dashboard/:_id/messages", urlEncodedParser, async (req, res) => {
    console.log("GET /messages");

    const user = await UserModel.findById(req.params._id, (err, doc) => {
      if (err) {
        console.error(err);
        return 0;
      }
      return doc;
    });
    res.send(user.messages);
  });
};
