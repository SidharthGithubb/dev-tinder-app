const express = require("express");
const userRouter = express.Router();
const tokenValidator = require("../middlewares/tokenValidator");
const { getAllRequestsForUser, getAllConnectionsForUser, feedController } = require("../controllers/userController");
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

userRouter.get(
  "/feed",
  tokenValidator,
  feedController
);

module.exports =userRouter;
