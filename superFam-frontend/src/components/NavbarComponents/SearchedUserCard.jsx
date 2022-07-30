import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { IoMdDoneAll } from "react-icons/io";
import { RiHeartAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const SearchedUserCard = ({ userFound,setSearchDivShow,searchDivShow }) => {
  const PublicFile = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Link to={`/profile/${userFound?._id}`}>
      <Flex
      onClick={()=>setSearchDivShow(!searchDivShow)}
        className="recommandetionCard"
        h="2.6rem"
        marginY=".3rem"
        p="1rem"
        align="center"
        bg='#416692dd'
        justify="space-between"
        border="1px solid #7676765e"
        borderRadius="lg"
        transition="all 0.3s ease"
        role='group'
        _hover={{
          boxShadow: " rgba(0, 0, 0, 0.09) 0px 3px 12px",
          border: "1px solid #ffffff",
          color:'black',
          bg: "#f5f8ff",
          transition: "all 0.3s ease",
        }}
      >
        <Flex align="center">
          <Box
            borderRadius="50%"
            overflow="hidden"
            w="1.8rem"
            h="1.8rem"
            mr="8px"
          >
            <Image w="100%" src={PublicFile + userFound?.profilePicture} />
          </Box>
          <Box w="8.5rem">
            <Text
              color="#ffffff"
              fontSize="14px"
              fontWeight="600"
              noOfLines={1}
              _groupHover={{color:'black'}}
            >
              {userFound?.username}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Link>
  );
};

export default SearchedUserCard;
