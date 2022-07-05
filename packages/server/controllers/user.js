const User = require("../models/user");

exports.createUser = async (req, res) => {
  const { uid, name } = req.body;
  try {
    await User.create({
      uid,
      name,
      balance: 0,
    });
    res.send({ eror: false });
  } catch (e) {
    res.send({ error: true, details: e });
  }
};

exports.getUser = async (req, res) => {
  let user = await User.findOne({ uid: req.query.uid });
  res.send({ error: !user, content: user });
};

exports.updateBalance = async (req, res) => {
  try {
    const { uid, balance } = req.body;
    await User.findOneAndUpdate({ uid }, { balance });
    res.send({ error: false });
  } catch (e) {
    console.log(e.message);
    res.send({ error: true, details: e });
  }
};
