import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../redux/post/action";

const ProfileCover = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [files, setFiles] = useState(null);

  const dispatch = useDispatch();

  const handleUpload = () => {
    if (files) {
      const data = new FormData();
      const fileName = files.name;

      data.append("name", fileName);
      data.append("file", files);

      console.log(data, "newpostData");
      dispatch(uploadPicture(data, toast));
    } else {
      // dispatch(createPost(newPost,toast));
    }
  };
  return (
    <>
      <Flex
        h={["15rem", "27rem"]}
        className="profileCoverWrapper"
        position="relative"
        mb="2rem"
        // border="1px solid black"
        w={["100%", "100%", "100%", "100%", "100%"]}
        direction="column"
        justifyContent="space-between"
      >
        <Box
          className="ProfileCoverPicDiv"
          h={["10rem", "20rem"]}
          boxShadow="  rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"
        >
          <Image h="100%" w="100%" objectFit="cover" src={user?.coverPicture} />
          <Flex justify="end" p="1rem" position="relative" align="center">
            <FiEdit
              position="absolute"
              top="0"
              right="0"
              fontSize="20px"
              color="#ff7979"
              cursor="pointer"
            />
            <Input
              type="file"
              opacity="0"
              w="2rem"
              right="4.7rem"
              position="absolute"
              cursor="pointer"
              id="fileCover"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files[0])}
            />
            <Flex justify="end">
              <Button
              display="flex"
              align="center"
              justify="center"
                boxShadow="  rgba(255, 0, 0, 0.37) 0px -23px 25px 0px inset, rgba(255, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(255, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(255, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.051) 0px 4px 2px, rgba(0, 0, 0, 0.067) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.008) 0px 32px 16px"
                ml="1rem"
                transition="all .5s ease"
                onClick={handleUpload}
                borderRadius="50%"
                w={["2rem", "2.4rem"]}
                h={["2.3rem", "2.4rem"]}
                p="0"
                color="white"
                _hover={{
                  color: "black",
                  transition: "all .4s ease",
                  transform: "scale(1.1)",
                  boxShadow:
                    " rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                }}
              >
                <RiSendPlaneFill fontSize="20px" />
              </Button>
            </Flex>
          </Flex>
        </Box>
        <Center
          zIndex="20"
          bg="#fff"
          w={["5rem", "7.5rem"]}
          h={["5rem", "7.5rem"]}
          position="absolute"
          left={["40%", "45%"]}
          right={["40%", "45%"]}
          bottom={["14%", "10%"]}
          // border="1px solid red"
          borderRadius="50%"
          boxShadow=" rgb(204, 219, 232) 3px 2px 6px 1px inset, rgb(255, 255, 255) -3px -2px 4px 0px inset"
        >
          <Image
            onClick={onOpen}
            cursor={"pointer"}
            boxShadow=" rgba(136, 165, 191, 0.68) 6px 2px 16px 0px, rgba(255, 255, 255, .5) -6px -2px 16px 0px"
            borderRadius="50%"
            w="85%"
            h="85%"
            objectFit={"cover"}
            transition="0.2s ease all"
            _hover={{ transform: "scale(1.2) ", transition: "0.5s ease all" }}
            src={user?.profilePicture}
          />
        </Center>
        <Flex
          justify="center"
          // border="2px solid red"
          w={["10rem", "20rem"]}
          py={["0", "1"]}
          margin="0 auto"
        >
          <Text
            color="#32526a"
            fontSize={["13px", "18px"]}
            fontWeight={"600"}
            noOfLines={1}
            cursor={"pointer"}
            className="userPostFont"
          >
            {user?.username}
          </Text>
        </Flex>
      </Flex>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={["xs", "sm", "md", "lg", "xl"]}
      >
        <ModalOverlay
          bg="#0000007f"
          backdropFilter="blur(10px) hue-rotate(10deg)"
        />
        <ModalContent mt="7rem" borderRadius="25px" overflow="hidden">
          <ModalCloseButton color="black" fontSize="15px" />
          <ModalBody p="0">
            <Flex
              h={["16rem", "20rem", "25rem", "35rem"]}
              w="full"
              direction="row"
              align="start"
              justify="center"
            >
              <Flex h="100%" w="100%" align="center">
                <Image
                  height={["full"]}
                  width={["100%"]}
                  objectFit={"cover"}
                  src={user.profilePicture}
                />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileCover;
