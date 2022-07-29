import React from "react";
import { chakra, Box, Flex, Image } from "@chakra-ui/react";
import logoPng from "../../assets/default.png"
import Spline from '@splinetool/react-spline';
const Feature=()=>{
  return (
    <Flex
      bg="#e7f1fb"
      // p={50}
      w="full"
      borderRadius="12px"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w="sm"
        mx="auto"
      >
        <Flex
          bg="gray.300"
          h={48}
          w="64"
          rounded="lg"
          align="center"
          justify="center"
          borderRadius="20px"
          overflow="hidden"
          marginY="5"
        >
<Spline scene="https://prod.spline.design/iwVKILINxN7gmP83/scene.splinecode" />

        </Flex>
        <Flex py="2">
            <a href="http://sumankumargiri.com/" target="_blank" rel="noreferrer">
            <chakra.button
              bg="#a0aebf"
              fontSize="xs"
              fontWeight="bold"
              color="white"
              px={20}
              py={1}
              transition="all 0.3s ease"
              rounded="lg"
              _focus={{
                bg: "gray.700",
                _dark: { bg: "gray.600" },
                outline: "none",
              }}
              _hover={{background: "gray.600", transition:"all 0.3s ease"}}
            >
              by Suman Giri
            </chakra.button></a>
          </Flex>
      </Flex>
    </Flex>
  );
};

export default Feature;