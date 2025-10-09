const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const tokenValidator = async (req, res, next) => {
  try {
    const token = req.cookies.token || "";
    if (!token) {
      throw new Error("No token provided");
    }
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Invalid token");
    }
    //Fetch user details from DB
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("User not found");
    }
    //Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({
        message: "Error while verifying the token",
        error: error.message,
      });
  }
};
module.exports = tokenValidator;
