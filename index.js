const mongoose = require("mongoose")
const app = require("./app")
const port = 5000
const API = "mongodb+srv://root:root123@cluster0.hzhvoqr.mongodb.net/TODO_APP?retryWrites=true&w=majority"
mongoose.set('strictQuery', false)
async function Main(){
    await mongoose.connect(API)
    console.log("Connected to database TODO_APP")
    app.listen(port , ()=>{console.log(`SERVER IS LIVE @ ${port}`)})
}

Main();