const express = require("express");
const bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded();
const UserModel = require("../UserModel");

module.exports = (app) => {
  app.use(urlEncodedParser);
  app.get("/api/products/:_id", async (req, res) => {
    console.log("GET /products/:_id");

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
  app.get("/api/products/", async (req, res) => {
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
