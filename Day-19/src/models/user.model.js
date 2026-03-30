const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique: [true,"Username already exists"],
        required:[true,"userName required"]
    },
    email: {
        type: String,
        unique: [true,"Email already exists"],
        required: [true,"Email is required"]
    },
    password: {
        type: String,
        required: [true,"Password is required"]
    },
    bio:String,
    profileImage: {
        type:String,
        default:"https://ik.imagekit.io/abhinavkit/default_profilepic.jpg"
    }
})

const userModel = mongoose.model("user",userSchema)
module.exports = userModel
