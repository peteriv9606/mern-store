const mongoose = require("mongoose");
const MessageSchema = require("./MessageSchema");
module.exports = mongoose.model("Message", MessageSchema, "users");
