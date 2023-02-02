const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserModal = new Schema({
    username:{type:String , required:true},
    password:{type:String , required:true}
})

const User = mongoose.model("Users" , UserModal)

module.exports = User