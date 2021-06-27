const express = require("express");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded();
const UserModel = require("../models/UserModel");

module.exports = (app) => {
  app.get("/products/", urlEncodedParser, async (req, res) => {
    //get all products from all users
    console.log("GET /products");
    const usersWithProducts = await UserModel.find({}, (err, user) => {
      if (err) {
        console.error(err);
        return 0;
      }
      user.filter((prod) => {
        return prod.products.length > 0;
      });
    });
    res.send(usersWithProducts);
  });
};
