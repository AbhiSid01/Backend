const app = require('./src/app');
const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://abhisid9955_db_user:2DvNMFXdAxSZGS1Q@cluster0.c9ozeo5.mongodb.net/Day-6")
    .then(()=>{
        console.log("Connected To Database");
    })
}

connectToDb();

app.listen(3000,()=>{
    console.log("Server running at port 3000");
})