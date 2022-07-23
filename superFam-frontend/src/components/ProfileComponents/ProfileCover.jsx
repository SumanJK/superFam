import {
  Box,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const ProfileCover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        h={["15rem","27rem"]}
        className="profileCoverWrapper"
        position="relative"
        mb="2rem"
        // border="1px solid black"
        w={["100%","100%","100%","100%","100%"]}
        direction="column"
        justifyContent="space-between"
      >
        <Box className="ProfileCoverPicDiv" h={["10rem","20rem"]} boxShadow="  rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px">
          <Image
            h="100%"
            w="100%"
            objectFit="fill"
            src="https://images.unsplash.com/photo-1624396963238-df0e48367ff7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2872&q=80"
          />
        </Box>
        <Center
        zIndex="20"
          bg="#fff"
          w={["5rem","7.5rem"]}
          h={["5rem","7.5rem"]}
          position="absolute"
          left={["40%","45%"]}
          right={["40%","45%"]}
          bottom={["14%","10%"]}
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
            src={
              "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80"
            }
          />
        </Center>
        <Flex
          justify="center"
          // border="2px solid red"
          w={["10rem","20rem"]}
          py={["0","1"]}
          margin="0 auto"
        >
          <Text
            color="#32526a"
            fontSize={["13px","18px"]}
            fontWeight={"600"}
            noOfLines={1}
            cursor={"pointer"}
            className="userPostFont"
          >
            Sushovita Das
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
                  src={
                    "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80"
                  }
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
