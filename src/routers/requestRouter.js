const express = require("express");
const requestRouter = express.Router();
const tokenValidator = require("../middlewares/tokenValidator");
const { sendRequest } = require("../controllers/requestController");

requestRouter.post(`/request/send/:status/:toUserId`, tokenValidator, sendRequest);

module.exports = requestRouter;