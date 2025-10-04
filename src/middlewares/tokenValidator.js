const jwt = require('jsonwebtoken');
const tokenValidator = (req, res, next) => {
    try {
       const token = req.cookies.token || '';
    if(!token){
        res.status(401).json({message: "No token provided"});
    }
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded token:", decoded);
    next();
    } catch (error) {
        res.status(401).json({message: "Invalid token", error: error.message});
    }
}
module.exports = tokenValidator;