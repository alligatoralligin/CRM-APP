const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const contactSchema = new mongoose.Schema({
  name: String,
  title: String,
  Email: String,
  phoneNumber: Number,
  Source: String,
  Img: String,
  User: { type: Schema.Types.ObjectId, ref: "User" },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
