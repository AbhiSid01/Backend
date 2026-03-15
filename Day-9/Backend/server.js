require("dotenv").config()
const app = require('./src/app');
const mongoose = require("mongoose");
const ConnectToDb = require('./src/config/database')

ConnectToDb();


app.listen(3000,(req,res)=>{
    console.log("Server running at port 3000");
})