import {
  Box,
  Collapse,
  Divider,
  Flex,
  Icon,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaSave } from "react-icons/fa";

import { TiVideo } from "react-icons/ti";
import { BsGearFill } from "react-icons/bs";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { IoIosHelpCircle } from "react-icons/io";
import { HiCode, HiCollection } from "react-icons/hi";
import {
  MdHome,
  MdKeyboardArrowRight,
  MdOutlineAccountCircle,
} from "react-icons/md";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePost } from "../../redux/post/action";
import { logoutUser } from "../../redux/auth/action";

const LeftSidebar = () => {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");

  const userId = useSelector((store) => store.auth.userId);

  const dispatch = useDispatch()

  const toast= useToast()

  const handleLogout= ()=>{
    
  dispatch(logoutUser(toast))

  }

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "linear-gradient(to right, #c1c9de, #ffffff)",
          _dark: {
            // bg: "gray.900",
          },
          color: "gray.900",
          transition: ".3s ease",
          transform: "translateX(4px)",
        }}
        role="group"
        fontWeight="600"
        transition=".3s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="6"
            _groupHover={{
              color: "#4dc1ff",
              transition: ".3s ease",
            }}
            transition=".3s ease"
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      py="6rem"
      pos="fixed"
      top="16"
      left="0"
      boxShadow=" rgba(136, 165, 191, 0.2) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"
      // zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex
        fontSize="md"
        color="gray.600"
        align="center"
        aria-label="Main Navigation"
        fontWeight="700"
        p="10px"
      >
        <MdOutlineAccountCircle fontSize="24px" /> &nbsp; Account
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <Link to="/">
          {" "}
          <NavItem icon={MdHome}>Home</NavItem>
        </Link>
        <Link to="/video">
          <NavItem icon={TiVideo}>Videos</NavItem>
        </Link>
        <NavItem icon={HiCollection}> Collections</NavItem>
        <NavItem icon={FaSave}>Saved</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
        <NavItem icon={HiCode} onClick={integrations.onToggle}>
          About Creator
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2">
            LinkedIn
          </NavItem>
          <NavItem pl="12" py="2">
            Github
          </NavItem>
          <NavItem pl="12" py="2">
            Portfolio
          </NavItem>
        </Collapse>
      </Flex>
      <Divider w="80%" margin="30px auto" />
      <NavItem fontSize="sm" color="gray.600" icon={IoIosHelpCircle}>
        Help
      </NavItem>
      {!userId && (
        <Link to="/signup">
          <NavItem fontSize="sm" color="gray.600" icon={RiLogoutCircleRFill}>
            Signup/Login
          </NavItem>
        </Link>
      )}
      {userId && (
        <NavItem fontSize="sm" color="gray.600" icon={RiLogoutCircleRFill} onClick={handleLogout}>
          Logout
        </NavItem>
      )}
    </Box>
  );

  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{
        bg: "gray.700",
      }}
      // minH="100vh"
    >
      <SidebarContent
        display={{
          base: "none",
          md: "unset",
        }}
      />
    </Box>
  );
};

export default LeftSidebar;
