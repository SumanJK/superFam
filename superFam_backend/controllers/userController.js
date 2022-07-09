const express = require('express')

const router= express.Router()

const bcrypt= require('bcrypt');
const User= require("../models/userModel");

//update user 

router.put("/:id", async (req, res) => {

//! if(req.body.userId==req.params.id) i.e if the user is trying to update his own account or not (we have to pass userId in body to confirm it) or he needs to be the admin
    if(req.body.userId == req.params.id || req.body.isAdmin){
        //! if the user wants to change the password then it should be handled by bcrypt

        if(req.body.password){
            try{
                const salt= await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }catch(e){
                return res.status(500).send(e);
            }
        }
        try{
            
            const user= await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            return res.status(200).send("Account has been updated")
        }catch(e){
            return res.status(500).send(e);
        }
    }else{
        return res.status(403).send("You can only update your account");
    }
})
//delete user 

router.delete("/:id", async (req, res) => {

        if(req.body.userId == req.params.id || req.body.isAdmin){
    
            try{
                
               await User.findByIdAndDelete(req.params.id);
                return res.status(200).send("Account has been Deleted")
            }catch(e){
                return res.status(500).send(e);
            }
        }else{
            return res.status(403).send("You can only delete your account");
        }
    })
//find a user

router.get("/:id", async (req, res) => {

        try{ 
            const user= await User.findById(req.params.id).lean().exec();
            return res.status(200).send(user)

        }catch(e){
            return res.status(500).send(e);
        }
})

//follow a user
//unfollow a user

router.get("/", (req, res)=>{
    try{
        return res.status(200).send("User Route");
    }catch(e){
        return res.status(500).send(e);
    }
})


module.exports = router;