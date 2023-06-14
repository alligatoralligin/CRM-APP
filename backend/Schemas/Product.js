const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  Img: String,
  GroupID: String,
  SalesID: String,
  SalesQuantity: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
