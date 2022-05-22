const mongoose = require("mongoose");

const userSur = mongoose.model(
  "userSur",
  new mongoose.Schema({
    idUser: String,
    idSur: String,
    nbreQst: String
  })
);

module.exports = userSur;