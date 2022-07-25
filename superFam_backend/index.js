const express = require('express');

const app = express();


const dotenv = require('dotenv');
const helmet= require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require("path");

//controllers
const userController= require('./controllers/userController');
const authController= require('./controllers/authController');
const postController= require('./controllers/postController');

dotenv.config();

const port= process.env.PORT || 8080;

const connect= ()=> mongoose.connect(process.env.DATABASE);  

app.use("/images", express.static(path.join(__dirname, "public/images")));

//Middleware------>
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
const multer = require('multer')


const storage= multer.diskStorage({
   destination:( req, file,cb) =>{
    cb(null, "public/images")
   },
   filename: (req,file,cb)=>{
    cb(null, file.originalname)
   }
})
upload= multer({storage});

app.post("/api/upload", upload.single("file"), (req,res)=>{
    try{

        return res.status(201).send("File uploaded successfully")

    }catch(err){

    }
} );

app.use("/api/users",userController);
app.use("/api/auth",authController);
app.use("/api/post",postController);


app.listen(port, async()=>{
    try {
        await connect()
        console.log(`connected to port ${port}`)

    } catch (error) {
        console.log(error.message);
    }
})
    