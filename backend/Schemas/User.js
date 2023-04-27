const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Contact } = require("./Contact");
const { SaleGroup } = require("./SalesGroup");
const passportLocalMongoose = require("passport-local-mongoose");

//User Schema to create a User that stores the references of Contact information
const userSchema = new Schema({
  Email: String,
  Groups: [{ type: Schema.Types.ObjectId, ref: "SaleGroup" }],
  Contacts: [{ type: Schema.Types.ObjectId, ref: "Contact" }],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
