const mongoose = require("mongoose");

const Nft = mongoose.model(
  "nft",
  new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    cid:String,
    reserved:Boolean

  })
);

module.exports = Nft;