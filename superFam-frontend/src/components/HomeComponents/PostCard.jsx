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
  Button,
  Tooltip,
  Avatar,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
} from "@chakra-ui/react";
import axios from "axios";

import React, { useState } from "react";
import shareIcon from "../../assets/instagram-share.svg";
import commentIcon from "../../assets/instagram-comment.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Heart from "react-heart";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { deletePost } from "../../redux/post/action";

export default function PostCard({ post }) {
  const PublicFile = process.env.REACT_APP_PUBLIC_FOLDER;


  const dispatch = useDispatch()

  const [showMore, setShowMore] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log(post.image,"data")

  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`https://superfam-backend-production.up.railway.app/api/user/${post.userId}`).then((res) => {
      setUser(res.data);
      // console.log(res.data,"pro res")
    });
  }, [post.userId]);
  //LIKES management
  const toast = useToast();

  const [like, setLike] = useState(post.likes.length);
  const [active, setActive] = useState(false);

  const userId = useSelector((store) => store.auth.userId);
  // console.log(userId, "usd");

  useEffect(() => {
    setActive(post.likes.includes(userId));
  }, [userId, post.likes]);
  // console.log(like, "LIKES");

  const likeHandler = () => {
    try {
      axios
        .put("https://superfam-backend-production.up.railway.app/api/post/" + post._id + "/like", { userId: userId })
        .then((res) => {
          // toast({
          //   title: res.data,
          //   status:
          //     res.data === "The post has been liked" ? "success" : "error",
          //   duration: 1000,
          //   isClosable: true,
          // });
        });
    } catch (err) {
      // console.log(err);
    }

    setLike(active ? like - 1 : like + 1);
    setActive(!active);
  };


  //delete post handler
  // console.log(post,"posts")


const handleDelete=()=>{

  dispatch(deletePost(toast,post?._id, userId))

}
  


  return (
    <>
      <Center
        py={6}
        w={["22rem", "22rem", "35rem", "35rem", "30rem"]}
        margin="auto"

      >
        
        <Box
          role={"group"}
          p={"1.2rem 1.2rem"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow=" rgba(136, 165, 191, 0) 4px 2px 16px 0px, rgba(189, 195, 220, 0.646) -4px -0px 16px 6px"
          rounded={"lg"}
          pos={"relative"}
          w={["20rem", "24rem", "24rem", "24rem", "24rem"]}
          zIndex={1}
          borderRadius="12px"
          // border='1px solid red'
        >
          <Flex pos={'absolute'} top='1' borderRadius='50%' right='1' zIndex={'50'} h='.8rem'>

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
              <MenuList p='0' border='2px solid #ffffff' bg='#e4e4e4' borderRadius='40px' overflow="hidden" fontSize="14px">
                  <MenuItem onClick={handleDelete}>Remove post</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          {" "}

          {post?.image && (
            <Box
              onClick={onOpen}
              borderRadius="10px"
              cursor={"pointer"}
              pos={"relative"}
              height={"320px"}
              role='group'
            >
              <Center overflow="hidden" borderRadius="10px"  >
              <Image
              
                borderRadius="10px"
                height={'320px'}
                width={"full"}
                transition='all .4s ease'
                objectFit={"cover"}
                src={PublicFile + post.image}
                _groupHover={{transform:'scale(1.04)', transition:'all .6s ease'}}
              /></Center>
            </Box>
          )}
          <Flex
            h="3.2rem"
            mt="4"
            minW="66"
            overflow="hidden"
            align="center"
            justify="start"
            zIndex={1}
          >
            <Flex w="3.5rem" h="2.4rem" align="center" justify="start">
              <Link to={`/profile/${post.userId}`}>
                {" "}
                <Image
                  w="2.4rem"
                  h="2.4rem"
                  cursor={"pointer"}
                  boxShadow="rgba(136, 165, 191, 0.48) 2px 2px 6px 0px, rgba(255, 255, 255, 0.8) -2px -2px 6px 0px"
                  borderRadius="50%"
                  objectFit={"cover"}
                  src={PublicFile + user?.profilePicture}
                />
              </Link>
            </Flex>
            <Link to={`/profile/${post.userId}`}>
              <Text
                color="#32526a"
                fontSize={"15px"}
                fontWeight={"600"}
                noOfLines={1}
                cursor={"pointer"}
                className="userPostFont"
                w="60"
              >
                {user?.username}
              </Text>
            </Link>
          </Flex>
          <Stack py={2} px="1">
            <Flex justify={"space-between"} align="center">
              <Flex className="leftLikeDiv" align="center" py="1">
                <Box
                  width="1.3rem"
                  h="1.35rem"
                  mr=".6rem"
                  className="postHeart"
                >
                  <Heart isActive={active} onClick={likeHandler} />
                </Box>
                <Image w="1.2rem" src={commentIcon} />
                <Image mx="8px" w="1.2rem" mt="1.5px" src={shareIcon} />
                {like !== 0 && (
                  <Text
                    px="10px"
                    fontSize="12px"
                    color="#4e4e4e"
                    fontWeight="500"
                  >
                    <span style={{ color: "red" }}>{like}</span> &nbsp;
                    {like === 1 ? "like" : "likes"}
                  </Text>
                )}
              </Flex>
              <Text color={"gray.600"} fontSize="12px" cursor="pointer">
                comments
              </Text>
            </Flex>
            {post?.image && (
              <HStack align={"end"} w={showMore ? "100%" : "60%"}>
                <Text
                  fontWeight={500}
                  fontSize={["12px", "12px", "13px", "13px"]}
                  noOfLines={showMore ? "none" : "1"}
                  color={"gray.600"}
                  // py="10px"
                >
                  {post?.description}
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
            )}
            {!post?.image && (
              <HStack align={"end"} w={"100%"}>
                <Text
                  fontWeight={500}
                  fontSize={["12px", "12px", "13px", "13px"]}
                  color={"gray.600"}
                  // py="10px"
                >
                  {post?.description}
                </Text>
              </HStack>
            )}
          </Stack>
        </Box>
      </Center>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={["sm", "md", "2xl", "4xl", "6xl"]}
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
              <Flex h="100%" w="50%" align="center">
                <Image
                  height={["full"]}
                  width={["12rem", "20rem", "30rem", "40rem", "50rem"]}
                  objectFit={"cover"}
                  src={PublicFile + post.image}
                />
              </Flex>
              <Box w="50%">
                <Flex
                  w="80%"
                  p="6"
                  pb="2"
                  overflow="hidden"
                  justify="start"
                  align="center"
                  zIndex={1}
                  // border='1px solid red'
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
                <Stack p="6" pt="2">
                  <Flex
                    justify={"space-between"}
                    align="center"
                    py="2"
                    width={["0", "40rem", "48rem", "60rem", "68rem"]}
                  >
                    <Flex
                      className="leftLikeDiv"
                      align="center"
                      py="1"
                      width={["0rem", "22rem", "12rem", "22rem", "30rem"]}
                    >
                      <Box
                        width="1.3rem"
                        h="1.35rem"
                        mr=".6rem"
                        className="postModalHeart"
                      >
                        <Heart isActive={active} onClick={likeHandler} />
                      </Box>
                      <Image w="1.2rem" src={commentIcon} />
                      <Image mx="8px" w="1.2rem" mt="1.5px" src={shareIcon} />
                      {like !== 0 && (
                        <Flex>
                          <Text
                            // border='1px solid black'
                            w={["4rem", "6rem"]}
                            px={["0", "10px"]}
                            fontSize="12px"
                            fontColor="#4e4e4e"
                            fontWeight="500"
                            noOfLines={"1"}
                          >
                            <span style={{ color: "red" }}>{like}</span> &nbsp;
                            {like === 1 ? "like" : "likes"}
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                    <Text
                      color={"gray.600"}
                      fontSize={["0", "12px"]}
                      cursor="pointer"
                      width={["0", "32rem", "34rem", "40rem", "40rem"]}
                    >
                      comments
                    </Text>
                  </Flex>
                  <HStack align={"end"}>
                    <Text
                      fontWeight={500}
                      fontSize={["12px", "12px", "13px", "13px"]}
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
                      {post?.description}
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
