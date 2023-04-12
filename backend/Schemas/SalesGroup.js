const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("./User");

//SaleGroup Schema used to group Users for aggregate information that is displayed on the dashboard.
const salegroupSchema = new mongoose.Schema({
  name: String,
  ownerID: String,
  Users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const SaleGroup = mongoose.model("SaleGroup", salegroupSchema);

module.exports = SaleGroup;
