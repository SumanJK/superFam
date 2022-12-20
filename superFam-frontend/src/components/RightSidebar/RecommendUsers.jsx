import { Box, Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiHeartAddFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import RecommendUsersCard from "./RecommendUsersCard";

const RecommendUsers = () => {

  const [ allUsers, setAllUsers]= useState([]);
  // console.log(allUsers,"allN")
  //! fetching recommanded users (all users)
  const userDetails= useSelector((store) => store.auth.userDetails)
  useEffect(() =>{
    axios.get("https://superfam-backend-production.up.railway.app/api/user").then((res)=>{
      setAllUsers(res?.data)
    })
  },[userDetails])

  return (
    <Box  height="21rem" px=".8rem" py=".5rem" >
      <Text
        fontSize="14px"
        fontWeight="700"
        className="semiHeader"
        letterSpacing=".5px"
        color="#c9d1e0"
      >
        RECOMMENDATIONS
      </Text>
      <Box
        // border="1px solid black"
        h="17rem"
        px=".5rem"
        overflowY="auto"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(120deg, #89f7fe 0%, #4b79b9 100%)",
            borderRadius: "24px",
          },
        }}
      >
        {allUsers?.map((el)=>{
          return (
            <RecommendUsersCard recUser={el} key={el._id}/>
          )
        })}
      </Box>
    </Box>
  );
};

export default RecommendUsers;
