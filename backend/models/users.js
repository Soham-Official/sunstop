const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 1,
  },
  signupUID: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Users", userSchema);
