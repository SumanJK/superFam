const express = require('express');

const router= express.Router();

const Post= require('../models/postModel')
const User= require('../models/userModel')

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

// Like & dislike the post 
router.put("/:id/like", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);

        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes: req.body.userId}});
            return res.status(200).send("The post has been liked")
        }else{
            await post.updateOne({$pull:{likes: req.body.userId}});
            return res.status(200).send("The post has been disliked")
        }
    }catch(err){
        return res.status(500).send(err)
    }
})

//get a post
router.get('/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).send(post)
    }catch(err){
        return res.status(500).send(err);
    }
})

//get timeline posts 
router.get('/timeline/all', async (req, res) =>{
    try{
        const currUser = await User.findById(req.body.userId);
        console.log(currUser);
        const userPosts = await Post.find({userId: currUser._id});
        const followersPost = await Promise.all(
            currUser.following.map((friendsId)=>{
                return Post.find({userId: friendsId});
            })
        )
        // res.json(userPosts.concat(...followersPost));
        return res.status(200).send(followersPost);
        
    }catch(err){
        return res.status(500).send(err);
    }
})

//get all posts of a user 
router.get('/profile/userposts', async (req, res) =>{
    try{
        const currentUser = await User.findById(req.body.userId);
        const userEveryPosts = await Post.find({userId: currentUser._id});
        // res.json(userPosts.concat(...followersPost));
        return res.status(200).send(userEveryPosts);
        
    }catch(err){
        return res.status(500).send(err);
    }
})

module.exports = router;