import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { BsEmojiWink } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
import { FcGallery } from "react-icons/fc";
import { HiOutlineLocationMarker, HiOutlinePhotograph } from "react-icons/hi";
import { TiUserAddOutline } from "react-icons/ti";
import {useState} from "react"
import { useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createPost, uploadPicture } from "../../redux/post/action";


const PostShare = () => {

  const dispatch = useDispatch()
  const toast = useToast();

  const [file, setFile] = useState(null);

  const desc= useRef();

  const userId= useSelector((store) =>store.auth.userId)
  const userDetails= useSelector((store) =>store.auth.userDetails)




  const handlePost= ()=>{
    const newPost = {
      userId: userId,
      description: desc.current.value,
    };
    desc.current.value=""
    if (file) {

      const data = new FormData();
      const fileName = file.name;

      
      data.append("name", fileName);
      data.append("file", file);

      newPost.image = fileName;
      console.log(data,"newpostData");
      dispatch(uploadPicture(data,newPost,toast))
    }else{
      dispatch(createPost(newPost,toast));
    }
    
  }
  return (
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
          src={userDetails?.profilePicture}
        >
          <AvatarBadge boxSize={[".6rem", ".8em"]} bg="#00ec47" />
        </Avatar>
        <Input
          focusBorderColor="white"
          variant="flushed"
          color="white"
          _placeholder={{ color: "white" }}
          placeholder=  {`What's on your mind, ${userDetails?.firstname}?`}
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
          >
            <HiOutlinePhotograph fontSize={["12px", "25px"]} color="white" />
            <Text fontSize={["8px", "15px"]} noOfLines="1">
              Upload Photo
            </Text>
            <Input
              type="file"
              opacity="0"
              display={"hidden"}
              position="absolute"
              cursor="pointer"
              id="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
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
  );
};

export default PostShare;
