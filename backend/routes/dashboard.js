const express = require("express");

const UserModel = require("../models/userModel");

module.exports = (app) => {
  app
    .route("/dashboard/:_id")
    .get((req, res) => {
      console.log("GET /dashboard/:_id");
      UserModel.findById(req.params._id, (err, user) => {
        if (err) console.error(err);
        else {
          if (user) {
            res.send(user);
          }
        }
      });
    })
    .post((req, res) => {
      //Add new product to current user's products array
      console.log("POST /dashboard/:_id");
      //req.params - gets current user's _id
      //req.body - gets new item values
      UserModel.findByIdAndUpdate(
        req.params._id,
        { $push: { products: req.body } },
        { new: true, upsert: true },
        (err, doc) => {
          if (err) console.error(err);
          else {
            res.send(doc);
          }
        }
      );
    })
    .delete((req, res) => {
      //Delete selected product
      console.log("DELETE /dashboard/:_id");
      UserModel.findByIdAndUpdate(
        req.params._id,
        { $pull: { products: { _id: req.body.product_id } } },
        { new: true, upsert: true },
        (err, doc) => {
          if (err) console.error(err);
          else {
            res.send(doc);
          }
        }
      );
    });
};
