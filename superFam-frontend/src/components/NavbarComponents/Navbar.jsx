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
  useColorModeValue,
  Image,
  Input,
  Center,
  IconButton,
  useDisclosure,
  Divider,
  Tooltip,
  useToast,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";

import logo from "../../assets/default-monochrome.svg";

import { ChatIcon, Search2Icon } from "@chakra-ui/icons";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { SiAirplayaudio } from "react-icons/si";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/action";
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import SidebarMobile from "./SidebarMobile";
import RecommendUsers from "../RightSidebar/RecommendUsers";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { RiHeartAddFill } from "react-icons/ri";
import SearchedUserCard from "./SearchedUserCard";

export default function Navbar() {
  const PublicFile = process.env.REACT_APP_PUBLIC_FOLDER;

  const userId = useSelector((store) => store.auth.userId);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchtext, setSearchText]= useState(null)

  const userDetails = useSelector((store) => store.auth.userDetails);

  const dispatch = useDispatch();

  const toast = useToast();
  const [searchDivShow, setSearchDivShow]= useState(false);

  const handleLogout = () => {
    dispatch(logoutUser(toast));
  };

  const [searchUser, setSearchUser] = useState([]);

  useEffect(() => {
    
    if(searchtext === ""){
      setSearchDivShow(false)
    }
  },[searchtext])

  const handleSearch = () => {
    console.log(searchtext, "texts");

    axios
      .get(
        `https://superfam-backend.herokuapp.com/api/user/search/${searchtext}`
      )
      .then((res) => {
        setSearchUser(res.data);
        
      });
      setSearchDivShow(!searchDivShow)
  };

 
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        pos="fixed"
        left="0"
        right="0"
        top="0"
        px="20px"
        zIndex="sticky"
        boxShadow=" lg"
        background={[
          "linear-gradient(to right, #ffffff, #9ea7bf)",
          "linear-gradient(to right, #ffffff, #929cba)",
          "linear-gradient(to right, #e2e8f1, #7680a0)",
        ]}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            bg="#ffffff"
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            className={"left"}
            spacing={8}
            alignItems={"center"}
            w={["40%", "40%", "25%", "33%"]}
          >
            <Flex justify={["center", "center", "start"]} w="100%">
              <Link to="/">
                <Image h="3rem" src={logo} />
              </Link>
            </Flex>
          </HStack>
          <Flex
            className={"middle"}
            w={["0%", "0%", "33%", "33%"]}
            display={["none", "none", "block", "block"]}
            alignItems={"center"}
            // border="1px solid red"
            pos={"relative"}
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
                placeholder="Search people / posts"
                w="90%"
                fontWeight={"400"}
                fontSize="16px"
                color="#52555f"
                border="none"
                outline="none"
                focusBorderColor="none"
                onChange={(e)=>{setSearchText(e.target.value)}}
              />
              <Center w="10%">
                <IconButton
                  _hover={{
                    backgroundColor: "#8f9bac",
                    transition: "all .5s ease",
                  }}
                  transition="all .4s ease"
                  backgroundColor="#d5dae8"
                  borderRadius="0"
                  w="100%"
                  aria-label="Search database"
                  icon={<Search2Icon color="#ffffff" />}
                  onClick={handleSearch}
                />
              </Center>
              <Box
              display={searchDivShow ? "block" : "none"}
                pos={"absolute"}
                // h="10rem"
                borderRadius='10px'
                w="full"
                top="10"
                // border="2px solid black"
                bg='#fbfbfb9e'
              >
                {searchUser.map((userFound)=>{
                  return(
                  <SearchedUserCard setSearchDivShow={setSearchDivShow} searchDivShow={searchDivShow} key={userFound?._id} userFound={userFound}/>
                  )
                })}
              </Box>
            </Flex>
          </Flex>
          <Flex
            align="center"
            justify="space-around"
            px="5%"
            className={"iconsDiv"}
            w={["10%", "6%", "20%", "23%"]}
            h="2rem"
            display={{ base: "none", md: "flex" }}
          >
            <Link to="/video">
              <Tooltip
                hasArrow
                label="Fam videos 💙"
                bg="gray.300"
                color="#52555f"
                borderRadius="10"
              >
                <Center>
                  <SiAirplayaudio fontSize="18px" color="white" />
                </Center>
              </Tooltip>
            </Link>
            <Center height="25px">
              <Divider orientation="vertical" />
            </Center>
            <Tooltip
              hasArrow
              label="chatbox 💬"
              bg="gray.300"
              color="#52555f"
              borderRadius="10"
            >
              <ChatIcon fontSize="18px" color="white" />
            </Tooltip>
          </Flex>

          <Flex
            alignItems={"center"}
            className={"right"}
            w={["10%", "6%", "4%", "3%"]}
            justify={"center"}
          >
            <Menu>
              <Tooltip
                hasArrow
                label="profile"
                bg="gray.300"
                color="#52555f"
                borderRadius="10"
              >
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  boxShadow=" rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.027) 0px 32px 16px"
                >
                  <Avatar
                    size={"sm"}
                    src={PublicFile + userDetails?.profilePicture}
                  />
                </MenuButton>
              </Tooltip>
              <MenuList>
                <Link to={`/profile/${userDetails?._id}`}>
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link to="/login">
                  <MenuItem>Login</MenuItem>
                </Link>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>

      {/* DRAWER */}

      <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" p="0 " bg="gray.300">
            <Flex h="4rem" p="8px" justify="start">
              <Link to="/">
                <Image h="100%" src={logo} />
              </Link>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <RecommendUsers />
            <SidebarMobile />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
