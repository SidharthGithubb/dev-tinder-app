const express = require("express");
const userRouter = express.Router();
const tokenValidator = require("../middlewares/tokenValidator");
const { getAllRequestsForUser, getAllConnectionsForUser } = require("../controllers/userController");
//Get all the pending connection requests for logged in user
userRouter.get(
  "/user/requests/receieved",
  tokenValidator,
  getAllRequestsForUser
);

userRouter.get(
    "/user/connections",
    tokenValidator,
    getAllConnectionsForUser
)

module.exports =userRouter;
