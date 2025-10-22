const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //reference to User model
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //reference to User model
    required: true,
  },
  status: {
    type: String,
    enum: { 
        values: ["ignored", "interested", "accepted", "rejected"],
        message: '{VALUE} is not supported' 
    },
    default: "pending",
    required: true,
  },
}, {
    timestamps: true,
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

//DB level Middleware to prevent sending request to oneself
//This .pre hook will run before saving a document to the database
connectionRequestSchema.pre("save", function (next) {
  const connecionRequest = this;
  if(connecionRequest.fromUserId.equals(connecionRequest.toUserId)) {
    throw new Error("Cannot send connection request to oneself");
  }
  next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
