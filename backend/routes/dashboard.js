const express = require("express");
const bodyParser = require("body-parser");
const UserModel = require("../models/UserModel");

module.exports = (app) => {
  app
    .route("/dashboard/:_id")
    .get((req, res) => {
      console.log("GET /dashboard/:_id");
      console.log(req.query, req.params);
      if (req.query && req.query.loggedIn === "true") {
        UserModel.findById(req.params._id, (err, user) => {
          if (err) {
            console.error(err);
            return 0;
          }
          if (user) res.send(user);
        });
      } else res.redirect("/");
    })
    .post((req, res) => {
      //Add new product to current user's products array
      console.log("POST /dashboard/:_id");
      console.log(req.body, req.params);
      //req.params - gets current user's _id
      //req.body - gets new item values
      UserModel.findByIdAndUpdate(
        req.params._id,
        { $push: { products: req.body } },
        { new: true, upsert: true },
        (err, doc) => {
          if (err) {
            console.error(err);
            return 0;
          } else res.send(doc);
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
          if (err) {
            console.error(err);
            return 0;
          } else res.send(doc);
        }
      );
    })
    .put((req, res) => {
      console.log("PUT /dashboard/:id");
      console.log(req.body, req.params);
      const product = req.body.product;
      UserModel.findById(req.params._id, (err, user) => {
        if (err) console.error(err);
        else {
          if (user) {
            //user found
            user.products.map((prod) => {
              if (prod._id == req.body.product._id) {
                prod.name = product.name;
                prod.description = product.description;
                prod.price = product.price;
                prod.discountedPrice = product.discountedPrice;
                prod.lastUpdated = product.lastUpdated;
                user.save((error, data) => {
                  if (error) {
                    console.error(error);
                    return 0;
                  } else res.send(data);
                });
              }
            });
          } else res.send("User not found");
        }
      });
    });
};
