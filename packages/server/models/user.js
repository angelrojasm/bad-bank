var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  uid: String,
  balance: Number,
});

var user = mongoose.model("user", userSchema);

module.exports = user;
