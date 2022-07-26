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
import React, { useState } from "react";

import PostCardHeart from "../HomeComponents/PostCardHeart";
import shareIcon from "../../assets/instagram-share.svg";
import commentIcon from "../../assets/instagram-comment.svg";

export default function ProfilePostCard({ user, userPost }) {
  const PublicFile = process.env.REACT_APP_PUBLIC_FOLDER;

  const [isClick, setClick] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        p={".2rem"}
        bg={userPost?.image ? "linear-gradient(145deg, #f0f0f0, #dfdfdf)" : 'black'}
        boxShadow=" 10px 10px 20px #b0afaf, -10px -10px 16px #ffffff"
        pos={"relative"}
        transition="all 0.4s ease"
        _hover={{
          transition: "all 0.4s ease",
          transform: "translateY(-5px)",
        }}
        w="100%"
        zIndex={1}
        borderRadius="14px"
      >
        <Box
          onClick={onOpen}
          borderRadius="10px"
          cursor={"pointer"}
          pos={"relative"}
          height={"360px"}
          overflow="hidden"
          p={userPost?.image ? "0" :"1rem"}
        >
          {userPost?.image && (
            <Image
              height={360}
              width={"full"}
              objectFit={"cover"}
              src={PublicFile + userPost?.image}
            />
          )}
          {!userPost?.image && (
            <Text
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
                      src={user?.profilePicture}
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
                      <PostCardHeart />
                      <Image w="1.2rem" src={commentIcon} />
                      <Image mx="8px" w="1.2rem" mt="1.5px" src={shareIcon} />
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
