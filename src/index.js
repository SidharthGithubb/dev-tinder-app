const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./configs/dbConfig");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 7778;

const authRouter = require("./routers/authRouter");
const profileRouter = require("./routers/profileRouter");
const requestRouter = require("./routers/requestRouter");

app.use("/api", authRouter, profileRouter, requestRouter);

connectDB()
  .then((conn) => {
    console.log(
      `Database connected successfully with url: ${conn.connection.host} and database: ${conn.connection.name}`
    );
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port}: http://localhost:${port}`
      );
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });