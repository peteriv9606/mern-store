const express = require("express");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded();
const UserModel = require("../models/userModel");

module.exports = (app) => {
  app.get("/products/", urlEncodedParser, (req, res) => {
    //get all products from all users
    console.log("GET /products");
    UserModel.find({}, (err, user) => {
      if (err) console.error(err);
      else {
        const userHasProducts = [];
        user.map((sing) => {
          if (sing.products.length > 0) userHasProducts.push(sing);
        });
        res.send(userHasProducts);
      }
    });
  });
};
