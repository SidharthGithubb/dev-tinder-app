const jwt = require("jsonwebtoken");
const tokenValidator = (req, res, next) => {
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
    req.user = decoded;
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
