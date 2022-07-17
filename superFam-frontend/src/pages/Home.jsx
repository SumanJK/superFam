import { Box, Flex } from "@chakra-ui/react";
import React from "react";
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
      <Box py="3.8rem"  flex="1">
        <Box h="150rem">
          <UnicefBanner />
          <Box></Box>
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
