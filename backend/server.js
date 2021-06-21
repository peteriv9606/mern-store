var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bodyParser = require("body-parser");
require("dotenv/config");

const app = express();
const jsonParser = bodyParser.json();
const urlEncodedParser = bodyParser.urlencoded();
const port = process.env.PORT || 4000;
const MONGO_URI =
  "mongodb+srv://admin:admin@maincluster.xxs1n.mongodb.net/mern-store?retryWrites=true&w=majority";
// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (!err) console.log("Connection to db successful!");
  }
);
//define the product schema
const ProductSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});
const UserSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: [ProductSchema],
});
//define the product model
const ProductModel = mongoose.model("Product", ProductSchema);
const UserModel = mongoose.model("User", UserSchema);

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

app.post("/login", urlEncodedParser, (req, res) => {
  console.log("POST /login");
  console.log(req.body);

  UserModel.findOne({ username: req.body.username }, (err, user) => {
    if (err) console.error(err);
    else {
      if (user) {
        //user found
        if (user.password === req.body.password) {
          res.send(user);
        } else {
          res.send("incorrect password");
        }
      } else {
        res.send("username not found");
      }
    }
  });
});

app.post("/register", urlEncodedParser, (req, res) => {
  console.log("POST /register");
  UserModel.find({ username: req.body.username }, (err, data) => {
    if (err) console.error(err);
    else {
      if (data[0]) {
        //user found?
        res.status(200);
        res.send("Username already taken");
      } else {
        //user NOT found
        const newUser = UserModel(req.body);
        newUser.save((error) => {
          if (error) console.error(error);
          else {
            res.status(201);
            res.json("User created successfuly");
          }
        });
      }
    }
  });
});

app.get("/user/:_id", (req, res) => {
  console.log(req.params);
  UserModel.findById(req.params._id, (err, user) => {
    if (err) console.error(err);
    else {
      if (user) res.send(user);
      else res.send("user not found");
    }
  });
});

app.get("/", (req, res) => {
  console.log("GET request: /");
  res.send("BackEndResponse");
});

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
