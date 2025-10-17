const express = require("express");
const requestRouter = express.Router();
const tokenValidator = require("../middlewares/tokenValidator");
const {
  sendRequest,
  reviewRequest,
} = require("../controllers/requestController");

requestRouter.post(
  `/request/send/:status/:toUserId`,
  tokenValidator,
  sendRequest
);

requestRouter.post(
  `/request/review/:status/:requestId`,
  tokenValidator,
  reviewRequest
);

module.exports = requestRouter;
