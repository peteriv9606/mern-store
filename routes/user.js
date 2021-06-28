const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../UserModel");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded();

module.exports = (app) => {
  app.put("/api/user/:_id/update", urlEncodedParser, async (req, res) => {
    console.log("PUT /api/user/:_id/update");
    const currUsr = req.body;
    console.log(currUsr);
    const isValidPass = await bcrypt.compare(
      currUsr.currentPassword,
      currUsr.password
    );

    if (isValidPass) {
      const salt = await bcrypt.genSalt(10);
      delete currUsr._id;
      delete currUsr.username;
      delete currUsr.currentPassword;
      delete currUsr.repNewPassword;
      delete currUsr.products;
      delete currUsr.registrationDate;
      delete currUsr.messages;
      currUsr.password = await bcrypt.hash(currUsr.newPassword, salt);
      delete currUsr.newPassword;
      console.log("TO UPDATE:", currUsr);
      UserModel.findByIdAndUpdate(
        req.params._id,
        currUsr,
        { new: true },
        (err, doc) => {
          if (err) console.log(err);
          else {
            res.status(200).send(doc);
          }
        }
      );
    } else res.send("Invalid Password");
  });

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
