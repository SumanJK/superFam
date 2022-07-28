import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PostCard from "../components/HomeComponents/PostCard";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import axios from "axios";
import PostShare from "../components/HomeComponents/PostShare";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePost } from "../redux/post/action";

const Home = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  const timeline = useSelector((store) => store.post.timelinePost);
  // console.log(timeline, "timeline home");

  const toast = useToast();

  //! fetching timeline posts

  useEffect(() => {
    dispatch(getTimelinePost(toast));
  }, [dispatch, toast]);

  useEffect(() => {
    if (timeline) {
      setPosts(timeline.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    } else {
      setPosts([]);
    }
  }, [timeline]);
  // console.log(posts, "restIn");

  console.log(timeline,"userposts")

  return (
    <Flex overflowX={"hidden"}>
      <Box w={["0", "0", "60", "60"]} className="leftSideBox"></Box>
      <LeftSidebar />
      <Box pt="3.8rem" flex="1" bg="gray.200">
        {timeline && 
            <PostShare />
        }
        {timeline?.length!==0 && timeline && (
            <Box
              w={["22rem", "32rem", "40rem", "46rem", "46rem"]}
              className="feed"
              margin="auto"
              bg="white"
              borderTopRadius={"15px"}
              pt="10"
            >
              {posts?.map((el) => {
                return <PostCard key={el._id} post={el} />;
              })}
            </Box>
        )}
        {/* if loggedout */}
        {!timeline && (
          <>
            <Text
              mt={['2rem',"8rem"]}
              mb={['0','-6rem']}
              p="0"
              textAlign={"center"}
              fontSize={["20px", "40px"]}
              textTransform="uppercase"
              fontWeight="700"
              color="#3b3b3b"
            >
              Login To <span style={{ color: "#007cf7", fontSize: "45px"}}>continue </span> <span style={{ color: "tomato",fontSize: "50px" }}>!</span>{" "}
            </Text>
            <Box mt={["-22rem", "0"]} w="100%" overflow="hidden" height= "620px" border="2px solid black">
              <lottie-player
                src="https://assets9.lottiefiles.com/packages/lf20_g3dzz0wz.json"
                background="transparent"
                speed="1"
                style={{
                  width: "100%",
                  height: "800px",
                  padding: "0",
                  margin: "0",
                }}
                loop
                autoplay
              ></lottie-player>
            </Box>
          </>
        )}
        {timeline?.length===0 && (
          <>
           <Text
           mt={['2rem',"4rem"]}
           mb={['0','-8rem']}
           p="0"
           textAlign={"center"}
           fontSize={["20px", "40px"]}
           textTransform="uppercase"
           fontWeight="700"
           color="#3b3b3b"
         >
           Upload your first <span style={{ color: "#0090f7da", fontSize: "40px"}}>Post </span> <span style={{ color: "tomato",fontSize: "50px" }}>!</span>{" "}
         </Text>
         <Box mt={["-18rem", "-8rem"]} w="100%" overflow="hidden" height= "515px" >
           <lottie-player
             src="https://assets7.lottiefiles.com/packages/lf20_hmdwlaed.json"
             background="transparent"
             speed="1"
             style={{
               width: "100%",
               height: "800px",
               padding: "0",
               margin: "0",
             }}
             loop
             autoplay
           ></lottie-player>
         </Box>
         </>
        )

        }
      </Box>
      <Box w={["0", "0", "0", "0", "80"]} className="rightSideBox"></Box>
      <RightSidebar />
    </Flex>
  );
};

export default Home;
