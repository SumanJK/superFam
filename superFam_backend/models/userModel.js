const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    firstname:  {type:String, required:true},
    lastname:  {type:String, required:true},
    username: {type:String, default:''},
    email: {type: String, required:true, unique : true},
    password: {type:String, required:true, min:5},
    profilePicture: {type:String, default:"superFamProfilePicbySumanGiri.jpg"},
    coverPicture: {type:String, default:"superFam_by_sumangiri_coverPic.png"},
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