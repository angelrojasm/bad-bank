var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var transactionSchema = new Schema({
  user: String,
  type: String,
  amount: Number,
});

var transaction = mongoose.model("transaction", transactionSchema);

module.exports = transaction;
