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
//find all users

router.get("/", async (req, res) => {

        try{ 
            const user= await User.find().lean().exec();
            return res.status(200).send(user)

        }catch(e){
            return res.status(500).send(e);
        }
})

//follow a user

router.put("/:id/follow", async (req, res) => {

    if(req.body.userId !== req.params.id){

        try{ 
            const searchedUser= await User.findById(req.params.id)

            const currentUser= await User.findById(req.body.userId)

            if(!searchedUser.followers.includes(req.body.userId)){

                await searchedUser.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{following:req.params.id}})

                return res.status(200).send("User has been followed")
            }else{
                return res.status(401).send("You already follow this user");
            }

        }catch(e){
             return res.status(500).send(e);
            }
    }else{
        return res.status(401).send("You can't follow yourself");
    }
})


//unfollow a user

router.put("/:id/unfollow", async (req, res) => {

    if(req.body.userId !== req.params.id){

        try{ 
            const searchedUser= await User.findById(req.params.id)

            const currentUser= await User.findById(req.body.userId)

            if(searchedUser.followers.includes(req.body.userId)){

                await searchedUser.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{following:req.params.id}})

                return res.status(200).send("User has been unfollowed")
            }else{
                return res.status(401).send("You don't follow this user");
            }

        }catch(e){
             return res.status(500).send(e);
            }
    }else{
        return res.status(401).send("You can't unfollow yourself");
    }
})

//search an user 

router.get("/search/:key", async (req, res) => {

    try {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
          }
        let result= capitalizeFirstLetter(req.params.key);
        let resultSmallLetter= req.params.key;

        console.log(result)
        
        const searchedUser= await User.find(
            {
                "$or": [
                    {"username":{$regex: result}},{"username":{$regex: resultSmallLetter}}
                ]
            }
        ).lean().exec();
        return res.status(200).send(searchedUser);

    }catch (err) {

        return res.status(500).send(err.message);
    }
});


module.exports = router;