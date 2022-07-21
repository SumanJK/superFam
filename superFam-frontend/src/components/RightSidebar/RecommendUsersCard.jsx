import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { IoMdDoneAll } from 'react-icons/io'
import { RiHeartAddFill } from 'react-icons/ri'

const RecommendUsersCard = () => {

  const [followed, setFollow]= useState(false)

  return (
    <Flex
          className="recommandetionCard"
          h="2.6rem"
          marginY=".5rem"
          p=".6rem"
          align="center"
          justify="space-between"
          border="1.5px solid #dde2ed"
          borderRadius="lg"
          transition="all 0.3s ease"
          _hover={{
            boxShadow:" rgba(0, 0, 0, 0.09) 0px 3px 12px",
            border: "1.5px solid #4dc1ff",
            bg:"#def3ff",
            transition:"all 0.3s ease"
          }}
        >
          <Box borderRadius="50%" overflow="hidden" w="1.8rem" h="1.8rem">
            <Image
              w="100%"
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            />
          </Box>
          <Box w="8.5rem" >
            <Text
              color="#5f6165"
              fontSize="14px"
              fontWeight="600"
              noOfLines={1}
            >
              Sudhir Chavan sfjsojfsjfsjs
            </Text>
          </Box>
          <Flex w="2rem" align="center" justify="center">
          {!followed && 
            <RiHeartAddFill
              fontSize="18px"
              cursor="pointer"
              color="#4dc1ff"
              onClick={()=>setFollow(!followed)}
            />
            }
            {followed && 
              <IoMdDoneAll fontSize="18px" color="#00e686"/>
            }
          </Flex>
        </Flex>
  )
}

export default RecommendUsersCard