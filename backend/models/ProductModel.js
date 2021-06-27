const mongoose = require("mongoose");
const ProductSchema = require("../schemas/ProductSchema");
module.exports = mongoose.model("Product", ProductSchema, "users");
