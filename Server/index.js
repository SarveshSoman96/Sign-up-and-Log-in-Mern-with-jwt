// getting express and starting server
const express = require("express");
const app = express();

app.use(express.json())

// getting data from env file
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const PORT = process.env.PORT

// mongoose connextion to db
const mongoose = require("mongoose");

require("./DB/connection")


app.use(require("./routes/userRoutes"));

app.get("/", (req, res) => {
    res.json("Hello from server")
});


app.listen(process.env.PORT, () => console.log(`srver started at port ${PORT}`))