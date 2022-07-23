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
import { useState } from "react";
import Spline from "@splinetool/react-spline";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/auth/action";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const email= useRef()
  const password= useRef()
  const confirmPassword= useRef()

  const navigate = useNavigate();

  const toast = useToast()

  const dispatch = useDispatch();

  //!submit login reqest-->

  const handleSubmit=()=>{

if( email.current.value && password.current.value && confirmPassword.current.value){
  
  if(password.current.value === confirmPassword.current.value){
    const payload={
      email: email?.current.value,
      password: password?.current.value
    }

    dispatch(loginUser(payload,toast,navigate))

    }else{
      toast({
        title: 'Passwords not matching, try again!',
        status: 'warning',
        isClosable: true,
      })
    }
      
  }else{
    toast({
      title: 'Please fill all the fields',
      status: 'warning',
      isClosable: true,
    })
  }
}

  return (
    <Box position={"relative"} py={{ base: 10, sm: 20, lg: 16 }}>
      <Flex
        as={SimpleGrid}
        maxW={"70rem"}
        margin="auto"
        boxShadow=" rgba(0, 0, 0, 0.4) 0px 30px 90px"
      h="40rem"
        borderRadius="20px"
      >
        <Stack w={["0","0","40rem","40rem"]}  borderLeftRadius="20px" overflow="hidden" zIndex="10">
        <Spline scene="https://prod.spline.design/sckOD82PH0OVgOtM/scene.splinecode" />
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
              Login
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.600,pink.200)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              We are connecting the world, be a part of our community by
              signing in on our website.
            </Text>
          </Stack>
          <Box as={"form"} mt={10}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" ref={email}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} ref={password}/>
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
            <FormControl id="password" isRequired>
              <FormLabel>Confirm password</FormLabel>
              <InputGroup>
                <Input type={showConfirmPassword ? "text" : "password"}  ref={confirmPassword}/>
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowConfirmPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              variant="primary"
              bgGradient="linear-gradient(to right, #a539c1, #671371)"
              color={"white"}
              transition="all 0.4s ease"
              _hover={{
                bgGradient: "linear-gradient(to right, #dc4fc9, #771072)",
                boxShadow: "xl",
                transition: "all 0.4s ease",
              }}
              onClick={handleSubmit}
            >
              Login
            </Button>
              <Text  textAlign="center" fontSize="12px" py="12px">
                Don't have an account? &nbsp;<Link to="/signup" >  <span style={{color:"purple", textDecoration: "underline", fontSize:"14px"}}>Signup</span> </Link>
              </Text>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};
export default Login;
