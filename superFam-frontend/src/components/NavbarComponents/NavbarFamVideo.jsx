import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Image,
  Input,
  Center,
  IconButton,
  useDisclosure,
  Divider,
  Tooltip,
  useToast,
} from "@chakra-ui/react";

import logo from "../../assets/famVideo.svg";

import { AddIcon, ChatIcon, Search2Icon } from "@chakra-ui/icons";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";

import { Link } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { getSearchedVideos } from "../../redux/video/action";



export default function NavbarFamVideo() {

  const toast = useToast()
  const dispatch = useDispatch();
  const searchBox = useRef();

  const handleSearchResult = () => {
    console.log(searchBox.current.value);

    dispatch(getSearchedVideos(searchBox.current.value,toast ))
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}
    pos={["none","fixed"]}
    left="0"
    right="0"
    top="0"
    px="20px"
    zIndex="sticky"
    boxShadow=" rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.464) -6px -2px 16px 0px"
    background={["linear-gradient(to right, #000000, #02345e)"]}>
      <Box
        // bg={useColorModeValue("gray.100", "gray.900")}
        // pos={["none","fixed"]}
        // left="0"
        // right="0"
        // top="0"
        // px="20px"
        // zIndex="sticky"
        // boxShadow=" rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.464) -6px -2px 16px 0px"
        // background={["linear-gradient(to right, #000000, #02345e)"]}
      >
        <Flex h={["20","20"]} alignItems={"center"} justifyContent={["center","center","space-between"]} >
          <HStack
            className={"left"}
            spacing={8}
            alignItems={"center"}
            justify="center"
            w={["50%", "50%", "25%", "33%"]}
            // border="2px solid white"
          >
            <Flex justify={["center", "center", "start"]} w="100%">
              <Link to="/">
                <Tooltip hasArrow label="Home page" bg="gray.600" color="#ffffff">
                  <Image h="3rem" src={logo} />
                </Tooltip>
              </Link>
            </Flex>
          </HStack>
          <Flex
            className={"middle"}
            w={["0%", "0%", "33%", "33%"]}
            display={["none", "none", "block", "block"]}
            alignItems={"center"}
          >
            <Flex
              w="100%"
              alignItems={"center"}
              borderRadius="lg"
              overflow="hidden"
            >
              <Input
                boxShadow={
                  " rgb(204, 219, 232) 3px 3px 5px 2px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
                }
                bg="rgb(236, 242, 248)"
                variant="outline"
                borderLeftRadius="lg"
                borderRightRadius="0"
                placeholder="Search videos"
                w="90%"
                fontWeight={"400"}
                fontSize="16px"
                color="#52555f"
                border="none"
                outline="none"
                focusBorderColor="none"
                ref={searchBox}
              />
              <Center w="10%">
                <IconButton
                boxShadow="  rgba(0, 8, 255, 0.37) 0px -23px 25px 0px inset, rgba(0, 132, 255, 0.15) 0px -36px 30px 0px inset, rgba(0, 170, 255, 0.1) 0px -79px 40px 0px inset, rgba(255, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.051) 0px 4px 2px, rgba(0, 0, 0, 0.067) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.008) 0px 32px 16px"
                  _hover={{
                    backgroundColor: "#7caef5",
                    transition: "all .5s ease",
                  }}
                  transition="all .4s ease"
                  backgroundColor="#444343"
                  borderRadius="0"
                  w="100%"
                  aria-label="Search database"
                  icon={<Search2Icon color="#ffffff" />}
                  onClick={handleSearchResult}
                />
              </Center>
            </Flex>
          </Flex>
          <Flex
            align="center"
            justify="space-around"
            px="7%"
            className={"iconsDiv"}
            w={["10%", "10%", "25%", "30%"]}
            h="2rem"
            display={{ base: "none", md: "flex" }}
          >
            <Tooltip hasArrow label="chatbox" bg="gray.300" color="#52555f">
              <ChatIcon fontSize="18px" color="white" />
            </Tooltip>
            <Center height="25px">
              <Divider orientation="vertical" />
            </Center>
            <Link to="/profile/:username">
              {" "}
              <Tooltip hasArrow label="Profile" bg="gray.300" color="#52555f">
                <Center>
                  <CgProfile fontSize="21px" color="white" />
                </Center>
              </Tooltip>
            </Link>
          </Flex>
        </Flex>
      </Box>
      <Box w={['full','0']} h={['3rem',0]} >
      <Flex 
            alignItems={"center"}
          >
            <Flex
              w="100%"
              alignItems={"center"}
              borderRadius="lg"
              overflow="hidden"
              h='2rem'
              justify='center'
            >
              <Input
                boxShadow={
                  " rgb(204, 219, 232) 3px 3px 5px 2px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
                }
                bg="rgb(236, 242, 248)"
                variant="outline"
                borderLeftRadius="20px"
                borderRightRadius="0"
                placeholder="Search videos"
                w="80%"
                fontWeight={"400"}
                fontSize="14px"
                color="#52555f"
                border="none"
                outline="none"
                focusBorderColor="none"
                ref={searchBox}
              />
              <Center w="10%">
                <IconButton
                boxShadow="  rgba(0, 8, 255, 0.37) 0px -23px 25px 0px inset, rgba(0, 132, 255, 0.15) 0px -36px 30px 0px inset, rgba(0, 170, 255, 0.1) 0px -79px 40px 0px inset, rgba(255, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.051) 0px 4px 2px, rgba(0, 0, 0, 0.067) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.008) 0px 32px 16px"
                  _hover={{
                    backgroundColor: "#7caef5",
                    transition: "all .5s ease",
                  }}
                  

                  transition="all .4s ease"
                  backgroundColor="#444343"
                  borderRadius="0"
                  borderRightRadius='16px'
                  w="100%"
                  aria-label="Search database"
                  icon={<Search2Icon color="#ffffff" fontSize='12px' />}
                  onClick={handleSearchResult}
                />
              </Center>
            </Flex>
          </Flex>
      </Box>
    </Box>
  );
}
