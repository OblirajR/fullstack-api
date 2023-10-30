const mongoose = require("mongoose")

const userDetails = new mongoose.Schema({
    fname : String,
    lname : String,
    email:String,
    password : String
})

module.exports.Users = mongoose.model("Users",userDetails)