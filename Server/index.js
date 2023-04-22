// getting express and starting server
const express = require("express");
const app = express();
// const cookieParser = require('cookie-parser');

// app.use(cookieParser());

// cors package 
const cors = require("cors");
app.use(cors());


// user Routes for log in & sign up
const userRoutes = require("./routes/userRoutes")

app.use(express.json())

// getting data from env file
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const PORT = process.env.PORT || 5000

// mongoose connextion to db
const mongoose = require("mongoose");

require("./DB/connection")


app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.json("Hello from server")
});


app.listen(PORT, () => console.log(`srver started at port ${PORT}`))