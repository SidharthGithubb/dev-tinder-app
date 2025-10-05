const mongoose = require("mongoose");
const connectDB = async () => {
  return mongoose.connect(process.env.CONNECTION_URL);
};
module.exports = connectDB;
