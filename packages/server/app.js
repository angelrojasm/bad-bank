const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routers/user");
const transactionRouter = require("./routers/transaction");
dotenv.config();

mongoose.connect(process.env.dbUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/transaction", transactionRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
}
app.listen(process.env.PORT || port, () => {
  console.log("app is running on port " + port);
});

app.get("/hello", function (req, res) {
  res.send("hello from Express!");
});

app.get("/get-all", async function (req, res) {
  res.send(await sampleModel.find());
});

module.exports = app;
