import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import PostCard from "../components/HomeComponents/PostCard";
import UnicefBanner from "../components/HomeComponents/UnicefBanner";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../components/RightSidebar/RightSidebar";

const Home = () => {
  return (
    <Flex overflowX={"hidden"}>
      <Box
        w={["0", "0", "60", "60"]}
        className="leftSideBox"
      ></Box>
      <LeftSidebar />
      <Box py="3.8rem"  flex="1" bg="gray.200">
        <Box h="150rem" w={["22rem","32rem","40rem","46rem","46rem"]} margin="auto" bg="white">
          <UnicefBanner />
          <PostCard/>
          <PostCard/>
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
