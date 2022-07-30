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
  useToast,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Tooltip,
  Menu,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import shareIcon from "../../assets/instagram-share.svg";
import commentIcon from "../../assets/instagram-comment.svg";
import Heart from "react-heart";
import axios from "axios";
import likeHeart from "../../assets/LikeHeart.svg";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { deletePost } from "../../redux/post/action";

export default function ProfilePostCard({ user, userPost }) {
  const PublicFile = process.env.REACT_APP_PUBLIC_FOLDER;

  const userId = useSelector((store) => store.auth.userId);

  // console.log(userPost,"posts of user")
  const [isClick, setClick] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  //! handle likes

  const [like, setLike] = useState(userPost.likes.length);
  const [active, setActive] = useState(false);

  

  useEffect(() => {
    setActive(userPost.likes.includes(user._id));
  }, [user._id, userPost.likes]);
  // console.log(like, "LIKES");

  const likeHandler = () => {
    if(!userId){
      toast({
        title: 'login to like a post',
        status:"info",
        duration: 1000,
        isClosable: true,
      });
    }else{

      try {
        axios
          .put("https://superfam-backend.herokuapp.com/api/post/" + userPost._id + "/like", { userId: user._id })
          .then((res) => {
            toast({
              title: res.data,
              status:
                res.data === "The post has been liked" ? "success" : "error",
              duration: 1000,
              isClosable: true,
            });
          });
      } catch (err) {
        console.log(err);
      }
  
      setLike(active ? like - 1 : like + 1);
      setActive(!active);
    }
  };

  //handle delete 

const dispatch = useDispatch()

const handleDelete=()=>{

  dispatch(deletePost(toast,userPost?._id, userId))

}

  return (
    <>
      <Box
        p={".2rem"}
        bg={
          userPost?.image
            ? "linear-gradient(145deg, #ffffff, #dfdfdf)"
            : "black"
        }
        boxShadow=" 10px 10px 20px #b0afaf, -10px -10px 16px #ffffff"
        pos={"relative"}
        transition="all 0.4s ease"
        _hover={{
          transition: "all 0.4s ease",
          transform: "translateY(-5px)",
          zIndex:'200'
        }}
        w="100%"
        // zIndex={1}
        borderRadius="14px"
      >
        <Flex pos={'absolute'} top='2' borderRadius='50%' right='2' zIndex={'50'} h='.8rem'>

<Menu >
    <Tooltip
      hasArrow
      label="menu"
      bg="gray.400"
      color="#f7f7f7"
      borderRadius="4"
    >
      <MenuButton
        as={Button}
        variant={"link"}
        cursor={"pointer"}
        // borderRadius="6px"
        bg='#ffffffa6'
        zIndex="100"
        minW='0'
        p='.4rem .8rem'
        justify="center"
        boxShadow="rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(95, 95, 95, 0.0) -6px -2px 16px 0px"
      >
        <BsThreeDots color='#454545' fontSize="20px"/>
      </MenuButton>
    </Tooltip>
    <MenuList p='0' border='2px solid #ffffff' bg='#e4e4e4' borderRadius='40px' overflow="hidden" fontSize="14px" _hover={{zIndex:'1000'}} zIndex='1000'>
        <MenuItem _hover={{zIndex:'1000'}} zIndex='1000' onClick={handleDelete}>Remove post</MenuItem>
    </MenuList>
  </Menu>
</Flex>
        <Box
          onClick={onOpen}
          borderRadius="10px"
          cursor={"pointer"}
          pos={"relative"}
          role="group"
          height={"360px"}
          overflow="hidden"
          // border="1px solid red"
          p={userPost?.image ? "0" : "1rem"}
        >
          {like !== 0 && (
            <Flex
              // border="2px solid red"
              pos="absolute"
              top="45%"
              bottom="45%"
              left="30%"
              right="30%"
              zIndex="40"
              direction="column"
              justify="space-between"
              align="center"
              h="5rem"
              transition="all .2s ease"
            >
              <Image
              h='50%'
                color="white"
                transition="all .3s ease"
                opacity="0"
                _groupHover={{
                  transition: "all .5s ease",
                  transform: "scale(1.4)",
                  opacity: ".6",
                }}
                src={likeHeart}
              />

              <Text
                px="10px"
                fontSize="16px"
                color="#ffffff"
                fontWeight="600"
                noOfLines={'1'}
                opacity="0"
                _groupHover={{
                  transition: "all .6s ease",
                  opacity: ".8",
                }}
              >
                {like}&nbsp;
                {like === 1 ? "like" : "likes"}
              </Text>
            </Flex>
          )}
          {userPost?.image && (
            <Image
              transition="all .2s ease"
              filter="brightness(100%)"
              _groupHover={{
                transition: "all .4s ease",
                filter: "brightness(50%)",
              }}
              height={360}
              width={"full"}
              objectFit={"cover"}
              src={PublicFile + userPost?.image}
            />
          )}
          {!userPost?.image && (
            <Text
              transition="all .2s ease"
              filter="brightness(100%)"
              _groupHover={{
                transition: "all .4s ease",
                filter: "brightness(20%)",
              }}
              className="userPostFont"
              fontWeight={500}
              fontSize={["11px", "12px", "12px", "13px"]}
              noOfLines={"16"}
              // overflow="hidden"
              color={"gray.200"}
              // py="10px"
            >
              {userPost?.description}
            </Text>
          )}
        </Box>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={
          userPost?.image
            ? ["sm", "md", "2xl", "4xl", "6xl"]
            : ["sm", "sm", "xl", "xl", "xl"]
        }
      >
        <ModalOverlay
          bg="#0000007f"
          backdropFilter="blur(10px) hue-rotate(10deg)"
        />
        <ModalContent borderRadius="12px" mt="7rem" overflow="hidden">
          <ModalCloseButton color="black" fontSize="15px" />
          <ModalBody p="0">
            <Flex
              h={["16rem", "20rem", "25rem", "35rem"]}
              w="full"
              direction="row"
              align="start"
              justify="space-between"
            >
              {userPost?.image && (
                <Flex h="100%" w="50%" align="center">
                  <Image
                    height={["full"]}
                    width={["12rem", "20rem", "30rem", "40rem", "50rem"]}
                    objectFit={"cover"}
                    src={PublicFile + userPost?.image}
                  />
                </Flex>
              )}
              <Box w={userPost?.image ? "50%" : "100%"}>
                <Flex
                  w="80%"
                  p="6"
                  pb="0"
                  overflow="hidden"
                  justify="start"
                  align="center"
                  zIndex={1}
                >
                  <Flex align="center" justify="start" mr="1rem">
                    <Image
                      width={["1.5rem", "1.5rem", "2rem", "2.5rem", "2.6rem"]}
                      h={["1.5rem", "1.5rem", "2rem", "2.5rem", "2.6rem"]}
                      cursor={"pointer"}
                      boxShadow="rgba(136, 165, 191, 0.48) 2px 2px 6px 0px, rgba(255, 255, 255, 0.8) -2px -2px 6px 0px"
                      borderRadius="50%"
                      objectFit={"cover"}
                      src={PublicFile + user?.profilePicture}
                    />
                  </Flex>
                  <Text
                    // color={"gray.700"}
                    color="#32526a"
                    fontSize={"15px"}
                    fontWeight={"600"}
                    noOfLines={1}
                    cursor={"pointer"}
                    className="userPostFont"
                    w={["14", "20", "30", "40", "60"]}
                  >
                    {user?.username}
                  </Text>
                </Flex>
                <Stack p="6">
                  <Flex
                    justify={"space-between"}
                    align="center"
                    py="2"
                    width={["0", "50rem", "60rem", "60rem", "60rem"]}
                  >
                    <Flex
                      className="leftLikeDiv"
                      align="center"
                      py="1"
                      width={["0", "6rem", "14rem", "22rem", "30rem"]}
                    >
                      <Box
                        width="1.3rem"
                        h="1.35rem"
                        mr=".6rem"
                        className="profilePostModalHeart"
                      >
                        <Heart isActive={active} onClick={likeHandler} />
                      </Box>
                      <Image w="1.2rem" src={commentIcon} />
                      <Image mx="8px" w="1.2rem" mt="1.5px" src={shareIcon} />
                      {like !== 0 && (
                        <Text
                          px="10px"
                          fontSize="12px"
                          fontColor="#4e4e4e"
                          fontWeight="500"
                        >
                          <span style={{ color: "red" }}>{like}</span> &nbsp;
                          {like === 1 ? "like" : "likes"}
                        </Text>
                      )}
                    </Flex>
                    <Text
                      color={"gray.600"}
                      fontSize={["0", "12px"]}
                      cursor="pointer"
                      width={["0", "32rem", "55%", "55%", "55%"]}
                    >
                      comments
                    </Text>
                  </Flex>
                  <HStack align={"end"}>
                    <Text
                      fontWeight={500}
                      fontSize={["12px", "12px", "13px", "14px"]}
                      noOfLines={[
                        showMore ? "6" : "4",
                        showMore ? "9" : "4",
                        showMore ? "12" : "5",
                        showMore ? "20" : "6",
                        showMore ? "20" : "7",
                      ]}
                      color={"gray.600"}
                      // py="10px"
                    >
                      {userPost?.description}
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
