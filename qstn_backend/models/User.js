const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "superadmin","admin", "company"]
    },
    username: {
      type: String
    },
    password: {
      type: String
      , select: false
    },
    phone: {
      type: String
    },
    country: {
      type: String
    },

    bio: {
      type: String
    },
    displayPicture: {
      type: String
    },
    point: {
      default: 0,
      type: Number,
    },
    firstLogin:{
      type:Boolean
    },
    reserved_nfts:{
      default:[],
      type:[]
    }    
  },
  { timestamps: true }
);

module.exports = model("users", UserSchema);
