import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PostCard from "../components/HomeComponents/PostCard";
import UnicefBanner from "../components/HomeComponents/UnicefBanner";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import axios from "axios";
import PostShare from "../components/HomeComponents/PostShare";

const Home = () => {

  const [ posts, setPosts]= useState([]);
  
  //! fetching timeline posts
  useEffect(() =>{
    axios.get("/post/timeline/62dc1717d076a3eed21a533e").then((res)=>{
      setPosts(res.data)
    })
  },[])
  

  return (
    <Flex overflowX={"hidden"}>
      <Box
        w={["0", "0", "60", "60"]}
        className="leftSideBox"
      ></Box>
      <LeftSidebar />
      <Box pt="3.8rem"  flex="1" bg="gray.200">
        <PostShare/>
        <Box  w={["22rem","32rem","40rem","46rem","46rem"]} className="feed" margin="auto" bg="white" borderTopRadius={"15px"} pt="10">

          {posts.map((el)=>{
            return (
              <PostCard key={el._id} datas= {el}/>
            )
          })}
        </Box>
      </Box>
      <Box
        w={["0", "0", "0","0", "80"]}
        className="rightSideBox"
      ></Box>
      <RightSidebar />
    </Flex>
  );
};

export default Home;
