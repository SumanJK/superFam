import {
  Box,
  Center,
  useColorModeValue,
  Text,
  Stack,
  Image,
  Flex,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import axios from "axios"

import React, { useState } from "react";
import PostCardHeart from "./PostCardHeart";
import shareIcon from "../../assets/instagram-share.svg";
import commentIcon from "../../assets/instagram-comment.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"



export default function PostCard({datas}) {
  
  const PublicFile = process.env.REACT_APP_PUBLIC_FOLDER;


  const [showMore, setShowMore]= useState(false);
  const {isOpen, onOpen, onClose}= useDisclosure()

  // console.log(datas.image,"data")

  const [user, setUser]= useState({});


  //get userDetails 
  useEffect(() =>{
    axios.get(`/users/${datas?.userId}`).then((res)=>{
      // console.log(res,"res")
      setUser(res.data)
    })
  },[datas?.userId])

  return (
    <>
    <Center
      py={6}
      w={["22rem", "22rem", "35rem", "35rem", "30rem"]}
      margin="auto"
    >
      <Box
        role={"group"}
        p={"1.1rem 1.2rem"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow=" rgba(136, 165, 191, 0) 4px 2px 16px 0px, rgba(189, 195, 220, 0.646) -4px -0px 16px 6px"
        rounded={"lg"}
        pos={"relative"}
        w={["20rem","24rem","24rem","24rem","24rem"]}
        zIndex={1}
        borderRadius="12px"
      >
        {datas?.image &&
        <Box
        onClick={onOpen}
        borderRadius="20px"
        cursor={"pointer"}
          pos={"relative"}
          height={"320px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 0,
            left: 0,
            backgroundImage: `url('${PublicFile + datas.image}')`,
            filter: "blur(6px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(8px)",
            },
          }}
        >
          <Image
            borderRadius="10px"
            height={320}
            width={"full"}
            objectFit={"cover"}
            src={PublicFile + datas.image}
          />
        </Box>
        }
        <Flex
          h="3.2rem"
          mt="4"
          minW="66"
          overflow="hidden"
          align="center"
          justify="start"
          zIndex={1}
          
        >
          <Flex w="3.5rem" h="2.4rem" align="center" justify="start" >
           <Link to="/profile/:username"> <Image
              w="2.4rem"
              h="2.4rem"
              cursor={"pointer"}
              boxShadow="rgba(136, 165, 191, 0.48) 2px 2px 6px 0px, rgba(255, 255, 255, 0.8) -2px -2px 6px 0px"
              borderRadius="50%"
              objectFit={"cover"}
              src={user?.profilePicture}
            /></Link>
          </Flex>
          <Link to={`/profile/${user?.username}`}><Text
            color="#32526a"
            fontSize={"15px"}
            fontWeight={"600"}
            noOfLines={1}
            cursor={"pointer"}
            className="userPostFont"
            w="60"
          
          >
            {user?.username}
          </Text></Link>
        </Flex>
        <Stack py={2} px="1">
          <Flex justify={"space-between"} align="center">
            <Flex className="leftLikeDiv" align="center" py="1">
              <PostCardHeart />
              <Image w="1.2rem" src={commentIcon} />
              <Image mx="8px" w="1.2rem" mt="1.5px" src={shareIcon} />
            </Flex>
            <Text color={"gray.600"} fontSize="12px" cursor="pointer">
              comments
            </Text>
          </Flex>
          {datas?.image &&
          <HStack align={"end"}  w={showMore ? "100%" : "60%"}>
            <Text
              fontWeight={500}
              fontSize={[ "12px", "12px", "13px", "13px"]}
              noOfLines={showMore ? "none" : "1"}
              color={"gray.600"}
              // py="10px"
            >
             {datas?.description}
            </Text>
            {!showMore && (
              <Text
                color={"gray.500"}
                fontSize="12px"
                cursor="pointer"
                onClick={() => setShowMore(!showMore)}
              >
                more...
              </Text>
            )}
          </HStack>}
          {!datas?.image &&
            <HStack align={"end"}  w={ "100%" }>
            <Text
              fontWeight={500}
              fontSize={[ "12px", "12px", "13px", "13px"]}
              color={"gray.600"}
              // py="10px"
            >
             {datas?.description}
            </Text>
            
          </HStack>
          }
        </Stack>
      </Box>
    </Center>


    <Modal isOpen={isOpen} onClose={onClose} size={["sm","md","2xl","4xl","6xl"]}>
        <ModalOverlay
          bg="#0000007f"
          backdropFilter="blur(10px) hue-rotate(10deg)"
        />
        <ModalContent borderRadius="12px" mt="7rem" overflow="hidden">
          <ModalCloseButton color="black" fontSize="15px" />
          <ModalBody p="0">
            <Flex h={["16rem","20rem","25rem","35rem"]} w="full" direction="row" align="start" justify="space-between">
              <Flex   h="100%" w="50%" align="center">
                <Image
                  height={["full"]}
                  width={["12rem","20rem","30rem","40rem","50rem"]}
                  objectFit={"cover"}
                  src={PublicFile + datas.image}
                  
                />
              </Flex>
              <Box  w="50%" >
                <Flex
                  w="80%"
                  p="6"
                  pb="0"
                  overflow="hidden"
                  justify="start"
                  align="center"
                  zIndex={1}
                >
                  <Flex  align="center" justify="start" mr="1rem">
                    <Image
                       width={["1.5rem","1.5rem","2rem","2.5rem","2.6rem"]}
                      h={["1.5rem","1.5rem","2rem","2.5rem","2.6rem"]}
                      cursor={"pointer"}
                      boxShadow="rgba(136, 165, 191, 0.48) 2px 2px 6px 0px, rgba(255, 255, 255, 0.8) -2px -2px 6px 0px"
                      borderRadius="50%"
                      objectFit={"cover"}
                      src={user?.profilePicture}
                    />
                  </Flex>
                  <Text
                    color="#32526a"
                    fontSize={"15px"}
                    fontWeight={"600"}
                    noOfLines={1}
                    cursor={"pointer"}
                    className="userPostFont"
                    w={["14","20","30","40","60"]}
                  >
                    {user?.username}
                  </Text>
                </Flex>
                <Stack p="6" >
                  <Flex justify={"space-between"} align="center" py="2" width={["0","40rem","48rem","60rem","68rem"]}>
                    <Flex className="leftLikeDiv" align="center" py="1" width={["0","6rem","14rem","22rem","30rem"]}>
                      <PostCardHeart />
                      <Image w="1.2rem" src={commentIcon} />
                      <Image mx="8px" w="1.2rem" mt="1.5px" src={shareIcon} />
                    </Flex>
                    <Text color={"gray.600"}  fontSize={["0","12px"]} cursor="pointer" width={["0","32rem","34rem","40rem","40rem"]}>
                      comments
                    </Text>
                  </Flex>
                  <HStack align={"end"}  >
                    <Text
                      fontWeight={500}
                      fontSize={[ "12px", "12px", "13px", "13px"]}
                      noOfLines={[showMore ? "6" : "4",showMore ? "9" : "4",showMore ? "12" : "5",showMore ? "20" : "6",showMore ? "20" : "7"]}
                      color={"gray.600"}
                      // py="10px"
                     
                    >
                      {datas?.description}
                    </Text>
                    {!showMore && (
                      <Text
                        color={"gray.500"}
                        fontSize="12px"
                        cursor="pointer"
                        onClick={() => setShowMore(!showMore)}
                      >
                        more...
                      </Text>
                    )}
                  </HStack>
                </Stack>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
