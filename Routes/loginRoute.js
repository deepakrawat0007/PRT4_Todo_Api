const User = require("../Modals/UserModal")
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const secret = "HelloUser"

router.post("/login" , async(req ,res)=>{
    try{
        const {username , password} = req.body

        const isUser = await User.findOne({username:username})
        if(!isUser){
            return res.status(400).send("No User Exist With Given UserName")
        }
        bcrypt.compare(password , isUser.password , async function(err , result){
            if(err){
                return res.status(400).json({
                    "Message":err.message
                })
            }
            if(result){
                const token = jwt.sign({
                    exp:Math.floor(Date.now() / 1000)+(60*60),
                    data:isUser._id
                },secret)

                return res.status(200).json({
                    "Message":"Login Success!!",
                    "Name":username,
                    "token":token
                })
            }else{
                return res.status(400).send("Invalid Credentials")
            }
        })

    }catch(e){
        return res.status(400).json({
            "Message":e.message
        })
    }
})


module.exports = router;