const ConnectionRequest = require("../models/connectionRequestModel");
const User = require("../models/userModel");
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
      res
        .status(201)
        .json({
          message: `Connection request sent successfully from ${fromUser.firstName} to ${toUser.firstName} with status ${status}`,
          data: request,
        });
    } else {
      res.status(200).json({
        message: "Connection request already exists",
      });
    }
  } catch (error) {
    res.status(500).json({ message:"error while sending a connection request", error: error.message });
  }
};

module.exports = { sendRequest };
