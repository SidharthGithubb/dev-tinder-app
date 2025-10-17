const ConnectionRequest = require("../models/connectionRequestModel");
const User = require("../models/userModel");

//DESC: Send a connection request to another user
//METHOD: POST
//ROUTE: /api/request/send/:status/:toUserId
const sendRequest = async (req, res) => {
  try {
    const fromUser = req.user; //From token
    // Extract fromUserId from the token (req.user) and toUserId & status from req.params
    const fromUserId = fromUser._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    // Check if toUserId is valid
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      throw new Error("Target user not found");
    }

    // Prevent sending request to oneself
    if (fromUserId.toString() === toUserId) {
      throw new Error("Cannot send connection request to oneself");
    }

    // Validate status
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid status type: " + status);
    }
    // Check if a request already exists
    const existingConnectionrequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (!existingConnectionrequest) {
      const request = new ConnectionRequest({ fromUserId, toUserId, status });
      await request.save();
      res.status(201).json({
        message: `Connection request sent successfully from ${fromUser.firstName} to ${toUser.firstName} with status ${status}`,
        data: request,
      });
    } else {
      res.status(200).json({
        message: "Connection request already exists",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "error while sending a connection request",
        error: error.message,
      });
  }
};

//DESC: Review a connection request (accept or reject)
//METHOD: POST
//ROUTE: /api/request/review/:status/:requestId
const reviewRequest = async (req, res) => {
  try {
    const loggedInUser = req.user; //From token

    const allowedStatuse = ["accepted", "rejected"];
    if (!allowedStatuse.includes(req.params.status)) {
      throw new Error("Invalid status type: " + req.params.status);
    }

    const connectionRequestReview = await ConnectionRequest.findOne({
      fromUserId: req.params.requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequestReview) {
      throw new Error("Connection request not found or already reviewed");
    }

    connectionRequestReview.status = req.params.status;
    const data = await connectionRequestReview.save();
    res
      .status(200)
      .json({
        message: `Connection request ${req.params.status} successfully`,
        data: data,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "error while reviewing a connection request",
        error: error.message,
      });
  }
};

module.exports = { sendRequest, reviewRequest };
