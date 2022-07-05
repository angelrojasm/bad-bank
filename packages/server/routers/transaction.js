const transactionController = require("../controllers/transactions");
const express = require("express");
const transactionRouter = express.Router();

transactionRouter.get("/", (req, res) => {
  transactionController.getTransactions(req, res);
});
transactionRouter.post("/", (req, res) => {
  transactionController.createTransaction(req, res);
});

module.exports = transactionRouter;
