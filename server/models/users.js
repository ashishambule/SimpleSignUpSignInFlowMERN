const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
  
  });

var UserToken = mongoose.Schema({
  authToken: {
    type: String,
  },
})
var User = mongoose.model("users", userSchema);
var UserToken = mongoose.model("UserToken",UserToken)
module.exports = { User,UserToken };
