import {
  Box, Flex,
} from "@chakra-ui/react";

import { FiMenu, FiSearch } from "react-icons/fi";

import React from "react";
import { MdRecommend } from "react-icons/md";
import RecommendUsers from "./RecommendUsers";
import Feature from "./Feature";


const RightSidebar = () => {


  return(
    <Box
    py="2rem"
      pos="fixed"
      top="16"
      right="0"
      boxShadow=" rgba(136, 165, 191, 0.6) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"
      // zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="hidden"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      color="inherit"
      borderRightWidth="1px"
      w={["0","0","0","0","80"]}
    >
      <Box className="FollowingsWrapper" borderRadius="12px" boxShadow= "rgba(0, 0, 0, 0.15) 0px 2px 8px" w="90%" margin="auto" >
        <Feature/>
      </Box>
      <Box className="RecommandedWrapper" borderRadius="lg" boxShadow= "rgba(0, 0, 0, 0.15) 0px 2px 8px" w="90%" margin="auto" marginY="3rem">
        <RecommendUsers />
      </Box>
    </Box>
  )
};


export default  RightSidebar 
