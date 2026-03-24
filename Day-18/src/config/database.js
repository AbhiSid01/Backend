const mongoose = require("mongoose")

async function connectToDb(){
    await mongoose.connect(process.env.MONGO_URI) 
        console.log("Connected To Databse")
   
}


module.exports = connectToDb