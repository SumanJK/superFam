const express = require('express')

const router= express.Router();

const User= require("../models/userModel");

//! bcrypt is used to hash password
const bcrypt = require('bcrypt');

//Register user
router.post("/register", async (req, res)=>{
    
    
    try{

    //! hash password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password, salt);

    //! creating new user
        const newUser= new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
   
        })
    //! saving new user
        const user= await newUser.save();
        return res.status(200).send(user);

    }catch(e){
        return res.status(500).send(e);
    }
})


//Login user

router.post("/login", async(req, res) => {

    try{

        let user= await User.findOne({email: req.body.email});

        if(!user){
            return res.status(404).send("Email doesn't exist")
        }

        let validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword){
            return res.status(404).send("Invalid Password")
        }

        return res.status(200).send(user);

    }catch(e){
        return res.status(500).send(e);
    }
})

module.exports = router;