const express = require('express');

const app = express();


const dotenv = require('dotenv');
const helmet= require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

//controllers
const userController= require('./controllers/userController');
const authController= require('./controllers/authController');

dotenv.config();

const port= process.env.PORT || 3000;

const connect= ()=> mongoose.connect(process.env.DATABASE);  


//Middleware------>
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userController);
app.use("/api/auth",authController);


app.listen(port, async()=>{
    try {
        await connect()
        console.log(`connected to port ${port}`)

    } catch (error) {
        console.log(error.message);
    }
})
    