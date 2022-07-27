import { Box, Flex, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import ProfilePostCard from "../components/ProfileComponents/ProfilePostCard";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import axios from "axios";
import { useState } from "react";
import ProfileCover from "../components/ProfileComponents/ProfileCover";
import { useDispatch, useSelector } from "react-redux";
import { getUserPost } from "../redux/post/action";
import { useParams } from "react-router";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);

  // const [user, setuser] = useState({});

  const userInfo = useParams();
  // console.log(userInfo,"from profile")

  //! fetching user posts
  //dummy datas

  const PublicFile = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});

  const dispatch = useDispatch();

  const toast = useToast();

  const userDetails = useSelector((store) => store.auth.userDetails);
  const userPost = useSelector((store) => store.post.userPost);

  useEffect(() => {
    dispatch(getUserPost(userInfo?.id, toast));
  }, [userDetails, dispatch, toast, userInfo]);

  useEffect(() => {
    setUserPosts(
      userPost?.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  }, [userPost]);
  console.log(userPost, "ok man");

  useEffect(() => {
    axios.get(`/user/${userInfo?.id}`).then((res) => {
      console.log("res",res)
      setUser(res.data);
    });
  }, [userInfo]);

  useEffect(() => {
    setUser(userDetails);
  }, [userDetails]);

  // console.log(userPosts,"dddsewwew")
  return (
    <Flex overflowX={"hidden"}>
      {user && (
        <>
          <Box
            minW={["0", "0", "60", "60", "60"]}
            // border="2px solid red"
            className="leftSideBoxProfile"
          ></Box>
          <LeftSidebar />
          <Box pt="3.8rem" flex="1">
            <ProfileCover user={user} />
            { !userPost  &&  (
              <Flex justify="center" marginTop="-2rem">
                <Text
            m="0"
            p="0"
            className="userPostFont"
            textAlign={"center"}
            fontSize={["20px", "40px"]}
            fontWeight="700"
            color="#414141"
          >
            User hasn't posted anything yet <span style={{ color: "tomato", fontSize: "55px" }}>!</span>{" "}
            <Box overflow="hidden" h='20rem' w="100%" marginTop="-10rem">
            <lottie-player
              src="https://assets5.lottiefiles.com/packages/lf20_s9lvjg2e.json"
              background="transparent"
              speed="1"
              style={{
                
                width: "100%",
                height: "500px",
                padding: "0",
                margin: "0",
              }}
              loop
              autoplay
            ></lottie-player></Box>
          </Text>
              </Flex>
            )}
            {userPost &&  (
              <SimpleGrid
                columns={["1", "1", "2", "3", "3"]}
                gap="10"
                p="8"
                w={["22rem", "26rem", "38rem", "54rem", "64rem"]}
                margin="auto"
                bg="linear-gradient(145deg, #f0f0f1, #edeff0)"
                
              >
                {userPosts?.map((el) => {
                  return (
                    <ProfilePostCard key={el._id} userPost={el} user={user} />
                  );
                })}
              </SimpleGrid>
            )}
          </Box>
        </>
      )}
      {!user && (
        <Box margin={"auto"} mt={["6rem", "8rem"]}>
          <Text
            m="0"
            p="0"
            textAlign={"center"}
            fontSize={["20px", "40px"]}
            textTransform="uppercase"
            fontWeight="700"
            color="#3b3b3b"
          >
            Login To access{" "}
            <span style={{ color: "#00caf7", fontSize: "55px" }}>
              {" "}
              Profile{" "}
            </span>{" "}
            <span style={{ color: "tomato", fontSize: "55px" }}>!</span>{" "}
          </Text>
          <Box mt={["-12rem", "0"]}>
            <lottie-player
              src="https://assets9.lottiefiles.com/packages/lf20_g3dzz0wz.json"
              background="transparent"
              speed="1"
              style={{
                width: "100%",
                height: "578px",
                padding: "0",
                margin: "0",
              }}
              loop
              autoplay
            ></lottie-player>
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default Profile;
