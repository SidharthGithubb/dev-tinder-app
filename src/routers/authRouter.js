const express = require("express");
const authRouter = express.Router();
const {
  signupUser,
  loginUser,
  logoutUser
} = require("../controllers/authController");
//Public routes
authRouter.post("/signup", signupUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

module.exports = authRouter;