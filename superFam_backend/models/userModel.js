const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    firstname:  {type:String, required:true},
    lastname:  {type:String, required:true},
    username: {type:String, default:''},
    email: {type: String, required:true, unique : true},
    password: {type:String, required:true, min:5},
    profilePicture: {type:String, default:"https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/61241a99666153.5ef7dbf39d0e2.jpg"},
    coverPicture: {type:String, default:"https://images.unsplash.com/photo-1624396963238-df0e48367ff7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2872&q=80"},
    followers:{type: Array, default:[]},
    following:{type: Array, default:[]},
    isAdmin: {type:Boolean, default:false},
    desc:{type:String, max: 40},
    city:{type:String, max: 40},
    relationship:{type:Number, enum: [1,2,3]}
},
{timestamps:true}
)

module.exports = mongoose.model("User", userSchema);