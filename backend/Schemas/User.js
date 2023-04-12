const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Contact } = require("./Contact");
const passportLocalMongoose = require("passport-local-mongoose");

//User Schema to create a User that stores the references of Contact information
const User = new Schema({
  Contacts: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
