var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
const path = require("path");
var bodyParser = require("body-parser");
require("dotenv/config");

const app = express();
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded();
const port = process.env.PORT || 4000;
const MONGO_URI =
  // Middleware
  app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

app
  .route("/users")
  .get(urlEncodedParser, (req, res) => {
    console.log(req.body);
    res.json(req.body);
  })
  .post(urlEncodedParser, (req, res) => {
    res.send({ auth_token: "2iah3iulw6sd7g1iuw906578ty78" });
  });

app.get("/", (req, res) => {
  console.log("Get request: /");
  res.send("BackEndResponse");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
