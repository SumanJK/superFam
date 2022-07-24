import { Box, Flex, SimpleGrid, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import VideoCard from '../components/VideoComponents/VideoCard'
import { getTrendingVideos } from '../redux/video/action'

const FamPlay = () => {

  const toast = useToast()
  const dispatch= useDispatch()

  const[videos, setVideos]= useState([])


  const famVidTrend= useSelector((store) =>store.video.famTrendVideos)

  const famVidSearched= useSelector((store) =>store.video.famSearchedVideos)
  console.log(famVidSearched)

useEffect(() =>{
  dispatch(getTrendingVideos(toast))
},[dispatch,toast])

useEffect(() =>{

  if(famVidSearched){
    setVideos(famVidSearched)
  }else{
    setVideos(famVidTrend)
  }
},[famVidTrend, famVidSearched])


  return (
    <Box bg="black" minH="45.3rem" mt={["0","4rem"]}>
      <SimpleGrid columns={["1","1","2","3","3"]} gap="10"  w={["20rem","36rem","58rem","74rem","86rem"]} margin="auto" bg="black" py={["10","20"]}>
      {videos?.map((vid,index)=>{

        return <VideoCard key={vid?.id.videoId} video={vid} ind={index}/>
      })}
      </SimpleGrid>
    </Box>
  )
}

export default FamPlay