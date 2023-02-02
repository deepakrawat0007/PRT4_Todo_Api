const User = require("../Modals/UserModal")
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/register" , async(req ,res)=>{
    try{
        const {username , password , Cpassword} = req.body

        const isUser = await User.findOne({username:username})
        if(isUser){
            return res.status(400).send("User Already Exist WIth Given UserName")
        }
        if(password !== Cpassword){
            return res.status(400).send("Password Not Match")
        }
        bcrypt.hash(password , 10 , async function(err , hash){
            if(err){
                return res.status(400).json({
                    "Message":err.message
                })
            }else{
                const user = new User({
                    username:username,
                    password:hash
                })
                user.save().then(()=>{
                    return res.status(200).json({
                        "Message":"User Created SuccessFully",
                        "User":user
                    })
                })
            }
        })

    }catch(e){
        return res.status(400).json({
            "Message":e.message
        })
    }
})


module.exports = router;