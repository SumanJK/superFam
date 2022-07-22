import React from 'react'
import Navbar from '../components/NavbarComponents/Navbar'
import {Routes, Route} from "react-router-dom"
import Profile from "./Profile"
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import ChatBox from './ChatBox'
const AllRoutes = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile/:username" element={<Profile />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/chatbox" element={<ChatBox/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes