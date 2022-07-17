import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { RiHeartAddFill } from "react-icons/ri";

const RecommendUsers = () => {
  return (
    <Box  height="20rem" px=".8rem" py=".5rem">
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
        h="16rem"
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
        <Flex
          className="recommandetionCard"
          h="2.6rem"
          marginY=".5rem"
          p=".6rem"
          align="center"
          justify="space-between"
          border="1.5px solid #dde2ed"
          borderRadius="lg"
          transition="all 0.3s ease"
          _hover={{
            boxShadow:" rgba(0, 0, 0, 0.09) 0px 3px 12px",
            border: "1.5px solid #4dc1ff",
            transition:"all 0.3s ease"
          }}
        >
          <Box borderRadius="50%" overflow="hidden" w="1.8rem" h="1.8rem">
            <Image
              w="100%"
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            />
          </Box>
          <Box w="8.5rem" >
            <Text
              color="#5f6165"
              fontSize="14px"
              fontWeight="600"
              noOfLines={1}
            >
              Sudhir Chavan sfjsojfsjfsjs
            </Text>
          </Box>
          <Flex w="2rem" align="center" justify="center">
            <RiHeartAddFill
              fontSize="18px"
              cursor="pointer"
              color=" #4dc1ff"
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default RecommendUsers;
