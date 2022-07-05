const userController = require("../controllers/user");
const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  userController.getUser(req, res);
});
userRouter.post("/", (req, res) => {
  userController.createUser(req, res);
});
userRouter.patch("/", (req, res) => {
  userController.updateBalance(req, res);
});

module.exports = userRouter;
