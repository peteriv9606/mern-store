const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = require("../schemas/ProductSchema");
const MessageSchema = require("../schemas/MessageSchema");

const UserSchema = Schema({
  fullName: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  registrationDate: Date,
  products: [ProductSchema],
  messages: {
    from: [MessageSchema],
    to: [MessageSchema],
  },
});

module.exports = UserSchema;
