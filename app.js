const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const bodyparser = require("body-parser")
const RegistrationRoute = require("./Routes/registrationRoute")
const LoginRoute = require("./Routes/loginRoute")
const Events = require("./Routes/CreateEvent")
const cors = require("cors")
const secret = "HelloUser"
app.use(cors())
app.use(bodyparser.json())
app.use(express.json())

app.use("/events" , (req , res , next)=>{
    if(req.headers.authorization){
        const token = req.headers.authorization
        if(token){
            jwt.verify(token , secret , function(err , decoded){
                if(err){
                    return res.status(400).json({
                        "Message":err.message
                    })
                }
                req.user = decoded.data
                next()
            })

        }else{
            return res.status(400).json({
                "Message":"Token Is Missing"
            })
        }
    }else{
        return res.status(400).json({
            "Message":"Not a Authenticated User"
        })
    }

})

app.use("/" , RegistrationRoute)
app.use("/" , LoginRoute)
app.use("/" , Events)

app.get("/" , (req ,res)=>{
    try{
        return res.status(200).json({
            "Message":"Server is OK"
        })

    }catch(e){
        return res.status(400).json({
            "Message":e.message
        })
    }
})

module.exports = app