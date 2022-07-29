import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { BsEmojiWink } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import { FcGallery } from "react-icons/fc";
import { HiOutlineLocationMarker, HiOutlinePhotograph } from "react-icons/hi";
import { TiUserAddOutline } from "react-icons/ti";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createPost, uploadPicture } from "../../redux/post/action";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdDoneAll, MdOutlineCancelScheduleSend } from "react-icons/md";

const PostShare = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const {
    isOpen: isPostEditOpen,
    onOpen: onPostEditOpen,
    onClose: onPostEditClose,
  } = useDisclosure();

  const [file, setFile] = useState(null);

  const desc = useRef();

  const userId = useSelector((store) => store.auth.userId);
  const userDetails = useSelector((store) => store.auth.userDetails);

  const PublicFile = process.env.REACT_APP_PUBLIC_FOLDER;

  const handlePost = () => {
    const newPost = {
      userId: userId,
      description: desc.current.value,
    };
    desc.current.value = "";
    if (file) {
      const data = new FormData();
      const fileName = file.name;

      data.append("name", fileName);
      data.append("file", file);

      newPost.image = fileName;
      // console.log(data, "newpostData");
      dispatch(uploadPicture(data, newPost, toast));
    } else if(newPost?.description){
      dispatch(createPost(newPost, toast));
    }else{
      toast({
        title: `choose a photo or write something to post`,
        variant:"left-accent",
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const handleChoosePic=()=>{
    toast({
      title: `click on share button to post`,
      variant:"left-accent",
      duration: 3000,
      position: 'top-right',
      isClosable: true,
    });
    onPostEditClose()
  }
  // console.log("okman", PublicFile + userDetails?.profilePicture);
  return (
    <>
      <Box
        borderRadius="20px"
        border="4px solid white"
        w="95%"
        margin="auto"
        mt="1rem"
        mb={["1rem", " 2rem"]}
        bg="linear-gradient(to right, #2e3754, #b4ced9)"
        boxShadow=" rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset"
      >
        <HStack px={["1rem", "4rem"]} py={["1rem", "2rem"]} spacing="4%">
          <Avatar
            boxShadow=" rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
            size={["sm", "md"]}
            src={PublicFile + userDetails?.profilePicture}
          >
            <AvatarBadge boxSize={[".6rem", ".8em"]} bg="#00ec47" />
          </Avatar>
          <Input
            focusBorderColor="white"
            variant="flushed"
            color="white"
            _placeholder={{ color: "white" }}
            placeholder={`What's on your mind, ${userDetails?.firstname}?`}
            w="100%"
            fontSize={["10px", "15px"]}
            ref={desc}
          />
        </HStack>
        <Divider orientation="horizontal" />
        <HStack
          h={["2rem", "4rem"]}
          px={["1rem", "3rem"]}
          justify={["space-around", "space-between"]}
          // border="1px solid red"
          color="white"
        >
          <HStack justify="space-around" w={["80%", "80%"]}>
            <HStack
              position="relative"
              justify="center"
              align="center"
              cursor="pointer"
              w={["60%", "100%"]}
              onClick={onPostEditOpen}
            >
              <HiOutlinePhotograph fontSize={["12px", "25px"]} color="white" />
              <Text fontSize={["8px", "15px"]} noOfLines="1">
                Upload Photo
              </Text>
             
            </HStack>
            <Divider
              orientation="vertical"
              display={["none", "block"]}
              h="1.4rem"
            />
            <HStack
              justify="center"
              align="center"
              cursor="pointer"
              w={["60%", "100%"]}
            >
              <TiUserAddOutline fontSize={["12px", "25px"]} color="white" />
              <Text fontSize={["8px", "15px"]} noOfLines="1">
                Tag Friends
              </Text>
            </HStack>
            <Divider
              orientation="vertical"
              display={["none", "block"]}
              h="1.4rem"
            />
            <HStack
              justify="center"
              align="center"
              cursor="pointer"
              w={["60%", "100%"]}
              fontSize={["12px", "16px"]}
            >
              <HiOutlineLocationMarker
                fontSize={["12px", "24px"]}
                color="white"
              />
              <Text fontSize={["8px", "15px"]} noOfLines="1">
                Location
              </Text>
            </HStack>
            <Divider
              orientation="vertical"
              display={["none", "block"]}
              h="1.4rem"
            />
            <HStack
              justify="center"
              align="center"
              cursor="pointer"
              w={["60%", "100%"]}
              fontSize={["12px", "16px"]}
            >
              <BsEmojiWink fontSize={["12px", "22px"]} color="white" />
              <Text fontSize={["8px", "15px"]} noOfLines="1">
                Feelings
              </Text>
            </HStack>
          </HStack>
          <Tooltip
            label="share picture"
            bg="gray.400"
            color="#ffffff"
            placement="right"
            borderRadius="10"
          >
            <Button
              w={["4rem", "8rem"]}
              color="#ffffff"
              bg="#323232"
              border="none"
              borderRadius="45px"
              boxShadow=" rgba(0, 0, 0, 0.08) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
              transition="all 0.6s ease 0s"
              cursor="pointer"
              outline="none"
              fontSize={["10px", "14px", "16px"]}
              h={["1.4rem", "2.4rem", "2.6rem"]}
              _hover={{
                bg: "rgb(255, 255, 255)",
                boxShadow: "0px 15px 20px rgba(219, 255, 255, 0.4)",
                color: "#373737",
                transform: "translateY(-3px)",
              }}
              _active={{ transitiontransform: "translateY(-1px)" }}
              onClick={handlePost}
            >
              <FaLocationArrow />
            </Button>
          </Tooltip>
        </HStack>
      </Box>

      <Modal
        isOpen={isPostEditOpen}
        onClose={onPostEditClose}
        size={["xs", "sm", "md", "lg", "xl"]}
      >
        <ModalOverlay
          bg="#0000007f"
          backdropFilter="blur(10px) hue-rotate(10deg)"
        />
        <ModalContent mt="7rem" borderRadius="25px" overflow="hidden">
          <ModalBody p="0">
            <Box >
              <Box  h="50%" boxShadow=" rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset">
                {file && (
                  <Box className="shareImgContainer" position="relative">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="cover pic"
                    />
                    <Button
                      position="absolute"
                      top="0"
                      w={["3rem", "3.6rem"]}
                      h={["1.5rem", "2.2rem"]}
                      p="0"
                      right="0"
                      borderRadius="0"
                      transition="all .5s ease"
                      boxShadow="  rgba(255, 0, 0, 0.367) 0px -23px 25px 0px inset, rgba(255, 0, 0, 0.285) 0px -36px 30px 0px inset, rgba(255, 0, 0, 0.258) 0px -79px 40px 0px inset, rgba(255, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.051) 0px 4px 2px, rgba(0, 0, 0, 0.067) 0px 8px 4px, rgba(0, 0, 0, 0.125) 0px 16px 8px, rgba(0, 0, 0, 0.062) 0px 32px 16px"
                      _hover={{ bg: "#ff0000cc", transition: "all .5s ease" }}
                      bg="transparent"
                      borderBottomLeftRadius={"24px"}
                      onClick={() => setFile(null)}
                    >
                      <MdOutlineCancelScheduleSend
                        color="#ffffffe7"
                        fontSize={["18px"]}
                      />
                    </Button>
                  </Box>
                )}
              </Box>
              <Flex
                py="2rem"
                direction="column"
                justify="center"
                align="center"
                h="50%"
              >
                <Input
                  border="none"
                  type="file"
                  opacity="1"
                  w="50%"
                  cursor="pointer"
                  id="filePost"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Text fontSize="14px" fontWeight="bold" color="#363636" pt="5%">
                  {file ? (
                    <Image data={file} />
                  ) : (
                    "Please choose a picture to post"
                  )}
                </Text>
                {file && (
                  <Button
                    display="flex"
                    align="center"
                    justify="center"
                    boxShadow="  rgba(255, 0, 0, 0.418) 0px -23px 25px 0px inset, rgba(255, 0, 0, 0.313) 0px -36px 30px 0px inset, rgba(255, 0, 0, 0.235) 0px -79px 40px 0px inset, rgba(255, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.051) 0px 4px 2px, rgba(0, 0, 0, 0.067) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.008) 0px 32px 16px"
                    ml="1rem"
                    transition="all .5s ease"
                    borderRadius="20px"
                    w={["8rem", "10rem"]}
                    h={["2rem", "3rem"]}
                    p="0"
                    color="white"
                    _hover={{
                      color: "black",
                      transition: "all .4s ease",
                      transform: "scale(1.1)",
                      boxShadow:
                        " rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                    }}
                    onClick={handleChoosePic}
                  >
                    {" "}
                    Done &nbsp;
                    <MdDoneAll fontSize="20px" />
                  </Button>
                )}
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostShare;
