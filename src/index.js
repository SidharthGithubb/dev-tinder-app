const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./configs/dbConfig");
connectDB()
  .then((conn) => {
    console.log(`Database connected successfully with url: ${conn.connection.host} and database: ${conn.connection.name}`);
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port}: http://localhost:${port}`
      );
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });
app.use(express.json());
const port = process.env.PORT || 7778;

app.use("/api", require("./routers/userRoute"));
