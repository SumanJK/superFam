const express = require('express');
const cors = require('cors')
const app = express();


const dotenv = require('dotenv');
const helmet= require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require("path");
app.use(cors())

helmet({
    crossOriginResourcePolicy: false,  //! Cross-origin Resource Policy
  })

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

app.use("/api/user",userController);
app.use("/api/auth",authController);
app.use("/api/post",postController);

app.get("/", async (req, res)=>{
    return res.status(201).send("USER AVAIL")
})


app.listen(port, async()=>{
    try {
        await connect()
        console.log(`connected to port ${port}`)

    } catch (error) {
        console.log(error.message);
    }
})
    