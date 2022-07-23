import { Box, Flex, SimpleGrid } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import VideoCard from '../components/VideoComponents/VideoCard'

const Video = () => {

  const key="AIzaSyBz64CALKZ-_yCfPppZXxYzuW3SEN0NDdE"

  const[videos, setVideos]= useState([])
  const[ query, setQuery]= useState()

useEffect(() =>{
  
  axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&maxResults=20&key=${key}&part=snippet`)
  .then((res)=>{
    console.log(res)
    setVideos(res.data.items)
  }).catch((err)=>{
    console.log(err,"error")
  })

},[query])


  return (
    <Box border="1px solid red" mt="4rem">
      <Flex>SearchBar</Flex>
      <SimpleGrid columns={["1","1","2","3","3"]} gap="6" p="8" w={["22rem","36rem","58rem","74rem","86rem"]} margin="auto" bg="black">
      {videos?.map((vid,index)=>{
        return <VideoCard key={vid?.id.videoId} video={vid} ind={index}/>
      })}
      </SimpleGrid>
    </Box>
  )
}

export default Video