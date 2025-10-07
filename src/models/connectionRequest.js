const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  status: {
    type: String,
    enum: { 
        values: ["pending", "accepted", "rejected", "ignored"],
        message: '{VALUE} is not supported' 
    },
    default: "pending",
  },
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
