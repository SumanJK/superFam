const express = require('express')

const router= express.Router();

const User= require("../models/userModel");

//! bcrypt is used to hash password
const bcrypt = require('bcrypt');

//Register user
router.post("/register", async (req, res)=>{
    
    
    try{

        let users= await User.findOne({email: req.body.email});

        if(users){
            return res.status(404).send("User has already been registered")
        }else{

            //! hash password
                const salt= await bcrypt.genSalt(10);
                const hashedPassword= await bcrypt.hash(req.body.password, salt);
        
            //! creating new user
                const newUser= {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    profilePicture: req.body.profilePicture,
                    coverPicture: req.body.coverPicture,
           
                }
                console.log(newUser,"neaw")
            //! saving new user
            try{

                const user= await User.create(newUser);
                
                return res.status(200).send(user);
            }catch(err){
                console.log(err,"errrrrr")
            }
        }

    }catch(e){
        return res.status(500).send(e);
        console.log(e,"userErr")
    }
})


//Login user

router.post("/login", async(req, res) => {

    try{

        let user= await User.findOne({email: req.body.email});

        if(!user){
            return res.status(404).send("User doesn't exist, try to signup first❕")
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