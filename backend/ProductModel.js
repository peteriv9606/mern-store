const mongoose = require("mongoose");
const ProductSchema = require("./ProductSchema");
module.exports = mongoose.model("Product", ProductSchema, "users");
