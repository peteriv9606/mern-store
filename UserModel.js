const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");

//define the product model
module.exports = mongoose.model("User", UserSchema, "users");
