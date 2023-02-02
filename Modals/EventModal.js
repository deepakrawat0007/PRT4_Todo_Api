const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ObjectId = Schema.ObjectId

const EventModal = new Schema({
    Activity:{type:String , required:true},
    Status:{type:String ,required:true},
    Time_Taken:{type:String},
    start_time:{type:String},
    user:{type:ObjectId , required:true}
})

const Event = mongoose.model("Events" , EventModal)

module.exports = Event