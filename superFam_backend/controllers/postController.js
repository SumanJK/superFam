const express = require('express');

const router= express.Router();

const Post= require('../models/postModel')

//CRUD operations

//create post

router.post("/", async (req, res)=>{
    try{
        const newPost =  new Post(req.body);
        const savedPost= await newPost.save();

        return res.status(200).send(savedPost);

    }catch(err){
        return res.status(500).send(err)
    }
})

//update post
router.put("/:id", async (req, res)=>{
    try{
        const post =  await Post.findById(req.params.id);
        if(post.userId===req.body.userId){

            await post.updateOne({$set: req.body})
            return res.status(200).send("Post has been updated successfully");

        }else{
            return res.status(404).send("You can't update others post")
        }

    }catch(err){
        return res.status(500).send(err)
    }
})


//delete post
router.delete("/:id", async (req, res)=>{
    try{
        const post =  await Post.findById(req.params.id);
        if(post.userId===req.body.userId){

            await post.deleteOne()
            return res.status(200).send("Post has been removed");

        }else{
            return res.status(404).send("You can't delete others post")
        }

    }catch(err){
        return res.status(500).send(err)
    }
})

module.exports = router;