import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavbarComponents/Navbar'
import {Routes, Route, useSearchParams, useLocation} from "react-router-dom"
import Profile from "./Profile"
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import ChatBox from './ChatBox'
import FamPlay from './FamPlay'
import NavbarFamVideo from '../components/NavbarComponents/NavbarFamVideo'
const AllRoutes = () => {

  const[rejectNav, setRejectNav]= useState(false)
  const[showVidNav, setShowVidNav]= useState(false)

  const location = useLocation();
  console.log(location.pathname,"path")
  
  useEffect(() =>{
      if(location.pathname==='/signup' || location.pathname === "/login"){
      setRejectNav(true)
      setShowVidNav(false)
      }
      else if(location.pathname==='/video'){
        setShowVidNav(true)
        setRejectNav(false)
      }
      else{
        setRejectNav(false)
        setShowVidNav(false)
      }
    },[location])

  return (
    <div>
      {!rejectNav && !showVidNav &&
        <Navbar/>}
        {showVidNav && 
          <NavbarFamVideo/>
        }
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile/:username" element={<Profile />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/chatbox" element={<ChatBox/>}/>
            <Route path="/video" element={<FamPlay/> }/>
        </Routes>
    </div>
  )
}

export default AllRoutes