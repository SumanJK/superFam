import React from "react";
import { chakra, Box, Flex, Image } from "@chakra-ui/react";
import logoPng from "../../assets/default.png"
import Spline from '@splinetool/react-spline';
const Feature=()=>{
  return (
    <Flex
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      w="full"
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
          shadow="md"
          align="center"
          justify="center"
        >
          {/* <Image marginTop={"-30px"} w="100%" src={logoPng} /> */}
          <Spline scene="https://prod.spline.design/iwVKILINxN7gmP83/scene.splinecode" />

        </Flex>

        <Box
          w={{ base: 56, md: 44 }}
          bg="white"
          _dark={{ bg: "gray.800" }}
          mt={0}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
        >
          <chakra.h3
            py={2}
            textAlign="center"
            fontWeight="500"
            textTransform="uppercase"
            color="gray.800"
            _dark={{ color: "white" }}
            letterSpacing={1}
            fontSize="13px"
          >
            By SumanGiri
          </chakra.h3>

          <Flex
            alignItems="center"
            justifyContent="center"
            // border="1px solid red"
            py={2}
            px={3}
            bg="gray.400"
            _dark={{ bg: "gray.700" }}
          >
            <a href="http://sumankumargiri.com/" target="_blank" rel="noreferrer">
            <chakra.button
              bg="gray.800"
              fontSize="xs"
              fontWeight="bold"
              color="white"
              px={2}
              py={1}
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bg: "gray.700",
                _dark: { bg: "gray.600" },
              }}
              _focus={{
                bg: "gray.700",
                _dark: { bg: "gray.600" },
                outline: "none",
              }}
            >
              Explore
            </chakra.button></a>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Feature;