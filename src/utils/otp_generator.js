const randomstring = require("randomstring");
const otp = randomstring.generate({ length: 6, charset: "numeric" });
const OTP_EXPIRY_TIME = 10 * 60 * 1000;

module.exports = { otp, OTP_EXPIRY_TIME };
