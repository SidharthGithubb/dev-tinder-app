const { isEmpty } = require("validator");
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
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "emailId",
      "profileImage",
    ]);

    res.status(200).json({
      message: "Pending requests fetched successfully",
      data: requests,
    });
  } catch (error) {
    res.status(500).json({
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
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", [
        "firstName",
        "lastName",
        "emailId",
        "profileImage",
      ])
      .populate("toUserId", [
        "firstName",
        "lastName",
        "emailId",
        "profileImage",
      ]);

    const connections = allConnections.map((row) => {
      if (row.fromUserId._id.equals(loggedInUser._id)) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

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
};

//DESC Get feed for logged in user
//METHOD: GET
//ROUTE: /api/feed
const feedController = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = req.query.page ? parseInt(req.query.page) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    limit = limit > 50 ? 50 : limit; //Max limit 50

    const skip = (page - 1) * limit;
    //Find all connection requests (sent + received) for logged in user
    const connectionsRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId status");

    const hideUsersFromFeed = new Set();
    connectionsRequests.forEach((connection) => {
      hideUsersFromFeed.add(connection.fromUserId.toString());
      hideUsersFromFeed.add(connection.toUserId.toString());
    });

    //Also hide logged in user
    hideUsersFromFeed.add(loggedInUser._id.toString());

    //Find all users except the ones in hideUsersFromFeed
    const newConnections = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) },
    })
      .select(
        "firstName lastName emailId profileImage headline bio gender skill"
      )
      .skip(skip)
      .limit(limit);
      
    if (!newConnections) {
      throw new Error("Error in fetching new connections");
    } else if (newConnections.length === 0) {
      res.status(200).json({
        message: "No new connections available",
      });
    } else {
      res.status(200).json({
        message: "Feed fetched successfully",
        data: newConnections,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "error while fetching feed for user",
      error: error.message,
    });
  }
};
module.exports = {
  getAllRequestsForUser,
  getAllConnectionsForUser,
  feedController,
};
