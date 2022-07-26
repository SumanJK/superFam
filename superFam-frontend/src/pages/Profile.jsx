import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import ProfilePostCard from '../components/ProfileComponents/ProfilePostCard'
import UnicefBanner from '../components/HomeComponents/UnicefBanner'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'
import { useParams } from 'react-router'
import axios from 'axios'
import { useState } from 'react'
import ProfileCover from '../components/ProfileComponents/ProfileCover'
import { useSelector } from 'react-redux'

const Profile = () => {

  const[ userPosts, setUserPosts]= useState([]);

  const [userDetails, setUserDetails]= useState({});
  console.log(userDetails,"us")

  //! fetching user posts
  //dummy datas
  const userName= useParams()

  const PublicFile = process.env.REACT_APP_PUBLIC_FOLDER;
  const user= useSelector((store) =>store.auth.userDetails)
  const userId= useSelector((store) =>store.auth.userId)

  useEffect(() =>{

    setUserDetails(user)
  },[user])

  useEffect(() =>{
    axios.get(`/post/profile/${userId}`).then((res)=>{

      setUserPosts(res.data)
    })
  },[userId])

  //! fetching user 

  // useEffect(() =>{
  //   axios.get("/users/62c840688b067ed1f7c4aa1b").then((res)=>{
  //     console.log(res.data,"profile user")
  //     setUserDetails(res.data)
  //   })
  // },[])
  // console.log(userDetails,"userDt")


  return (
    <Flex overflowX={"hidden"}>
    <Box
      minW={["0","0","60", "60", "60"]}
      // border="2px solid red"
      className="leftSideBoxProfile"
    ></Box>
    <LeftSidebar />
    <Box py="3.8rem"   flex="1">
        <ProfileCover user={userDetails} />
      <SimpleGrid columns={["1","1","2","3","3"]} gap="10" p="8" w={["22rem","26rem","38rem","54rem","64rem"]} margin="auto" bg="linear-gradient(145deg, #f0f0f1, #edeff0)">
        {userPosts?.map((el)=>{
          return(
            <ProfilePostCard  key={el._id} userPost= {el} user={userDetails} />
          )
        })
        }
      </SimpleGrid>
    </Box>
  </Flex>
  )
}

export default Profile