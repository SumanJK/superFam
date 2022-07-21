import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import ProfilePostCard from '../components/ProfileComponents/ProfilePostCard'
import UnicefBanner from '../components/HomeComponents/UnicefBanner'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'

const Profile = () => {
  return (
    <Flex overflowX={"hidden"}>
    <Box
      minW={["0","0","60", "60", "60"]}
      // border="2px solid red"
      className="leftSideBoxProfile"
    ></Box>
    <LeftSidebar />
    <Box py="3.8rem"   flex="1">
        <UnicefBanner />
      <SimpleGrid columns={["1","1","2","3","3"]} gap="10" p="8" w={["22rem","26rem","38rem","54rem","66rem"]} margin="auto" bg="linear-gradient(145deg, #f0f0f1, #edeff0)">
        <ProfilePostCard/>
        <ProfilePostCard/>
        <ProfilePostCard/>
        <ProfilePostCard/>
        <ProfilePostCard/>
        <ProfilePostCard/>
        <ProfilePostCard/>
      </SimpleGrid>
    </Box>
  </Flex>
  )
}

export default Profile