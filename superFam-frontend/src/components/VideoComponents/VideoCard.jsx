import { Box, Center, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

const VideoCard = ({video,ind}) => {
  return (
    <Center border="1px solid white"   position="relative">
      <Center h="12rem" overflow="hidden">
        <Image objectFit="cover" src={video?.snippet.thumbnails.high.url}/>
      </Center>
      <Text className="videoCount" color="white" position="absolute" fontSize="50px" bottom="-18%" right="6%" zindex="200">{ind+1} </Text>

    </Center>

  )
}

export default VideoCard