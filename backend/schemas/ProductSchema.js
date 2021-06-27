const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  discountedPrice: Number,
  uploadDate: Date,
  lastUpdated: Date,
});

module.exports = ProductSchema;
