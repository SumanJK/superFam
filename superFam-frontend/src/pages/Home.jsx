import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import UnicefBanner from '../components/HomeComponents/UnicefBanner'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'

const Home = () => {
  return (
    <Flex overflowX={"hidden"}  >

    
    <Box w={["0","0","60","60"]} border="1px solid red"></Box>
    <LeftSidebar/>
    <Box py="3.8rem"  border="1px solid red" flex="1">
      <Box  h="150rem">
      <UnicefBanner />
        <Box>

        </Box>
      </Box>
    </Box>
    </Flex>
  )
}

export default Home