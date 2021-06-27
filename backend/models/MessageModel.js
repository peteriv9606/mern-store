const mongoose = require("mongoose");
const MessageSchema = require("../schemas/MessageSchema");
module.exports = mongoose.model("Message", MessageSchema, "users");
