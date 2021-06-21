const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
module.exports = mongoose.model("User", UserSchema, "users");
