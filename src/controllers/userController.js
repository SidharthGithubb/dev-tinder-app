const ConnectionRequest = require("../models/connectionRequestModel");
const User = require("../models/userModel");
//DESC Get all the pending connection requests for logged in user
//METHOD: GET
//ROUTE: /api/user/requests
const getAllRequestsForUser = async (req, res) => {
  try {
    const loggedInUser = req.user; //From token

    const requests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "emailId", "profileImage"]);

    res
      .status(200)
      .json({
        message: "Pending requests fetched successfully",
        data: requests,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "error while fetching connection requests for user",
        error: error.message,
      });
  }
};

//DESC Get all connections for logged in user
//METHOD: GET
//ROUTE: /api/user/connections
const getAllConnectionsForUser = async (req, res) => {
    try {
        const loggedInUser = req.user; //From token

        const allConnections = await ConnectionRequest.find({
            $or: [
                {fromUserId : loggedInUser._id, status: "accepted"},
                {toUserId : loggedInUser._id, status: "accepted"},
            ]
        }).populate("fromUserId", ["firstName", "lastName", "emailId", "profileImage"]);
        
        const connections = allConnections.map(connection => connection.fromUserId);
        
        res.status(200).json({
            message: "Connections fetched successfully",
            data: connections,
        });
    } catch (error) {
        res.status(500).json({
            message: "error while fetching connections for user",
            error: error.message,
        });
    }
}

module.exports = { getAllRequestsForUser, getAllConnectionsForUser };
