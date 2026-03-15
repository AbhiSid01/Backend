require("dotenv").config()
const app = require('./src/app');
const mongoose = require("mongoose");

const connectDb = require('./src/config/databse')

connectDb()

app.listen(3000,()=>{
    console.log("Server running at port 3000");
})