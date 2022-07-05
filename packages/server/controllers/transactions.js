const Transaction = require("../models/transaction");

exports.createTransaction = async (req, res) => {
  const { user, type, amount } = req.body;
  try {
    await Transaction.create({
      user,
      type,
      amount,
    });
    res.send({ eror: false });
  } catch (e) {
    res.send({ error: true, details: e });
  }
};

exports.getTransactions = async (req, res) => {
  const { user } = req.query;
  let transaction = await Transaction.find({ user });

  res.send({ error: transaction.length === 0, content: transaction });
};
