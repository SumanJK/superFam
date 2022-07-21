import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { RiHeartAddFill } from "react-icons/ri";
import RecommendUsersCard from "./RecommendUsersCard";

const RecommendUsers = () => {
  return (
    <Box  height="21rem" px=".8rem" py=".5rem">
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
        <RecommendUsersCard/>
        <RecommendUsersCard/>
        <RecommendUsersCard/>
        <RecommendUsersCard/>
        <RecommendUsersCard/>
        <RecommendUsersCard/>
        <RecommendUsersCard/>
        <RecommendUsersCard/>
        <RecommendUsersCard/>
        <RecommendUsersCard/>
        <RecommendUsersCard/>
      </Box>
    </Box>
  );
};

export default RecommendUsers;
