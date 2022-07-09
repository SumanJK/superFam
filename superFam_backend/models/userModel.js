const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    username: {type:String, required:true, min : 4, max : 20, unique : true},
    email: {type:String, required:true, unique : true},
    password: {type:String, required:true, min: 5},
    profilePicture: {type:String, default:""},
    coverPicture: {type:String, default:""},
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