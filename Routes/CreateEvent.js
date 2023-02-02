const User = require("../Modals/UserModal");
const router = require("express").Router();
const Events = require("../Modals/EventModal");

router.post("/events", async(req ,res)=>{
    try{
        const user = await User.findById(req.user)

        const {Activity } = req.body

        const event = new Events({
            Activity:Activity,
            Status:"Pending",
            Time_Taken:"",
            start_time:"",
            user:req.user
        })
        event.save().then(()=>{
            return res.status(200).json({
                "Message":"Event Created Success",
                "event":event
            })
        })

    }catch(e){
        return res.status(400).json({
            "Message":e.message
        })
    }
})


router.get("/events", async(req ,res)=>{
    try{
        const events = await Events.find({user:req.user})
        return res.status(200).json(events)
    }catch(e){
        return res.status(400).json({
            "Message":e.message
        })
    }
})

router.put("/events/updateStatus/:id", async(req ,res)=>{
    try{
        const _id = req.params.id
        const user = await User.findById(req.user)

        const {Status , start_time , Time_Taken} = req.body
        const change = {Status:Status,
                        start_time:start_time ,
                    Time_Taken:Time_Taken}
        const event = await Events.findByIdAndUpdate(_id ,change ,{
            new:true,
            userFindAndModity:false
        })

        const events = await Events.find()
        return res.status(200).json({
            "message":"Updated Data",
            "data" :events
        })


    }catch(e){
        return res.status(400).json({
            "Message":e.message
        })
    }
})


module.exports = router;