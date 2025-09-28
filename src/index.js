const express = requires('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 7778;

app.listen(port, () =>{
    console.log(`Server is running on port ${port}: http://localhost:${port}`);
})
