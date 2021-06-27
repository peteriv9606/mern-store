const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = MessageSchema;
