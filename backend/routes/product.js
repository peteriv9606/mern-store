const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded();
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductModel");
module.exports = (app) => {
  app.get("/product/:_id", urlEncodedParser, async (req, res) => {
    console.log("GET /product/:_id");

    userProd = new UserModel();
    const product = await UserModel.find(
      {
        //match users where product._id matches the requested product id
        products: { $elemMatch: { _id: req.params._id } },
      },
      { password: false, messages: false, registrationDate: false },
      (err, doc) => {
        if (err) {
          console.error(err);
          return 0;
        }
        if (doc) {
          return doc;
        } else return "Not Found";
      }
    );
    if (product[0]) {
      product[0].products = product[0].products.filter((prod) => {
        return prod._id == req.params._id;
      });
      res.send(product[0]);
    } else res.status(200).send("Not found");
  });
};
