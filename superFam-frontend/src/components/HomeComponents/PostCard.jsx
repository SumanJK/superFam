import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Flex,
} from "@chakra-ui/react";

export default function PostCard() {
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow=" rgba(136, 165, 191, 0.48) 4px 2px 16px 0px, rgba(189, 195, 220, 0.646) -4px -0px 16px 6px"
        rounded={"lg"}
        pos={"relative"}
        border={"1px solid red"}
        zIndex={1}
      >
        <Flex
          h="4rem"
          w="60"
          overflow="hidden"
          align="start"
          justify="end"
          // border={"1px solid red"}
          my={1}
          top="0"
          zIndex={1}
        >
          <Box  w="2.4rem"
              h="2.4rem">
            <Image
              mr="10px"
              w="2.4rem"
              h="2.4rem"
              boxShadow="rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"
              borderRadius="50%"
              src="https://images.unsplash.com/photo-1539125530496-3ca408f9c2d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            />
          </Box>
          <Text
            color={"gray.500"}
            fontSize={"13px"}
            fontWeight={"600"}
            noOfLines={1}
          >
            Sudhir Chavan fsfsfsfafsdfasdfdsffsfsfsfs
          </Text>
        </Flex>
        <Box
          rounded={"lg"}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 2,
            left: 0,
            backgroundImage: `url("https://images.unsplash.com/photo-1649859398731-d3c4ebca53fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80")`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            // rounded={'lg'}
            height={230}
            width={282}
            objectFit={"cover"}
            src="https://images.unsplash.com/photo-1649859398731-d3c4ebca53fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
        </Box>
        <Stack pt={10}>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            Nice Chair, pink
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              $57
            </Text>
            <Text textDecoration={"line-through"} color={"gray.600"}>
              $199
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
