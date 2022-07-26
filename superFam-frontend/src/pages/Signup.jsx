import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {registerUser} from "../redux/auth/action"


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const firstname = useRef();
  const lastname = useRef();
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      firstname.current.value &&
      lastname.current.value &&
      email.current.value &&
      password.current.value
    ) {
      const payload = {
        firstname: firstname?.current.value,
        lastname: lastname?.current.value,
        username: `${firstname?.current.value} ${lastname?.current.value}`,
        email: email?.current.value,
        password: password?.current.value,
      };

      dispatch(registerUser(payload,toast,navigate))

    
      
    } else {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        isClosable: true,
      });
    }
  };

  const userId= useSelector((store)=> store.auth.userId)
  console.log(userId,"userID")

  useEffect(() =>{


  },[userId])

  return (
    <Box position={"relative"} py={{ base: 10, sm: 20, lg: 10 }}>
      <Flex
        as={SimpleGrid}
        maxW={"70rem"}
        margin="auto"
        boxShadow=" rgba(0, 0, 0, 0.4) 0px 30px 90px"
        borderRadius="20px"
      >
        <Stack
          w={["0", "0", "40rem", "40rem"]}
          borderLeftRadius="20px"
          overflow="hidden"
          zIndex="10"
          cursor="pointer"
        >
          <Spline
            style={{ zIndex: "1" }}
            scene="https://prod.spline.design/GS8eIr1xAh29Gwdc/scene.splinecode"
          />
        </Stack>
        <Stack
          bg={"gray.50"}
          borderRadius="20px"
          borderLeftRadius="0"
          overflow="hidden"
          px={{ base: 4, sm: 6, md: 20 }}
          py={{ base: 4, sm: 6, md: 14 }}
          spacing={{ base: 8 }}
          w="32rem"
          zIndex="200"
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Join our community
              <Text
                as={"span"}
                bgGradient="linear(to-r, purple.400,pink.200)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              We are connecting the world, be a part of our community by
              registering on our website.
            </Text>
          </Stack>
          <Box as={"form"} mt={10}>
            <FormControl isRequired>
              <FormLabel>Firstname</FormLabel>
              <Input type="text" ref={firstname} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Lastname</FormLabel>
              <Input type="text" ref={lastname} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" ref={email} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  ref={password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              fontFamily={"heading"}
              variant="primary"
              mt={8}
              w={"full"}
              bgGradient="linear-gradient(to right, #594bb7, #2c1848)"
              color={"white"}
              transition="all 0.4s ease"
              _hover={{
                bgGradient: "linear-gradient(to right, #964fdc, #3e1077)",
                boxShadow: "xl",
                transition: "all 0.4s ease",
              }}
              onClick={handleSubmit}
            >
              Signup
            </Button>
            <Text textAlign="center" fontSize="12px" py="6px">
              Already registered? &nbsp;
              <Link to="/login">
                {" "}
                <span
                  style={{
                    color: "purple",
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                >
                  Login
                </span>{" "}
              </Link>
            </Text>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};
export default Signup;
