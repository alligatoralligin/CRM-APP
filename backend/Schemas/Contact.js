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
  AssignedGroup: String,
  Notes: String,
  ContactStatus: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
