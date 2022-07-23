import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavbarComponents/Navbar'
import {Routes, Route, useSearchParams, useLocation} from "react-router-dom"
import Profile from "./Profile"
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import ChatBox from './ChatBox'
import Video from './Video'
const AllRoutes = () => {

  const[rejectNav, setRejectNav]= useState(false)

  const location = useLocation();
  // console.log(location.pathname,"path")
  
  useEffect(() =>{
      if(location.pathname==='/signup' || location.pathname === "/login"){
      setRejectNav(true)

      }else{
        setRejectNav(false)
      }
    },[location])

  return (
    <div>
      {!rejectNav &&
        <Navbar/>}
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile/:username" element={<Profile />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/chatbox" element={<ChatBox/>}/>
            <Route path="/video" element={<Video/> }/>
        </Routes>
    </div>
  )
}

export default AllRoutes