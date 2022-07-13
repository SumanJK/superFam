import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
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
  Icon,
} from "@chakra-ui/react";

import logo from "../../assets/default-monochrome.svg";
import { BsChatLeftDots } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";

import {
  AddIcon,
  BellIcon,
  ChatIcon,
  Search2Icon,
  SearchIcon,
} from "@chakra-ui/icons";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={6}
        boxShadow=" rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"
        background={[
          "linear-gradient(to right, #ffffff, #9ea7bf)",
          "linear-gradient(to right, #ffffff, #9ea7bf)",
          "linear-gradient(to right, #e2e8f1, #8892ad)",
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
              <Image h="3rem" src={logo} />
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
                placeholder="Search people / posts"
                w="90%"
                fontWeight={"400"}
                fontSize="16px"
                color="#52555f"
                border="none"
                outline="none"
                focusBorderColor="none"
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
                />
              </Center>
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
            <Tooltip
              hasArrow
              label="All superfam users"
              bg="gray.300"
              color="#52555f"
            >
              <AddIcon fontSize="18px" color="white" />
            </Tooltip>
            <Center height="25px">
              <Divider orientation="vertical" />
            </Center>
            <Tooltip hasArrow label="chatbox" bg="gray.300" color="#52555f">
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
              <Tooltip hasArrow label="profile" bg="gray.300" color="#52555f">
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  boxShadow=" rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1649326858339-a5b9dc560a0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1120&q=80"
                    }
                  />
                </MenuButton>
              </Tooltip>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
