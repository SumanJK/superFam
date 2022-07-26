import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import ProfilePostCard from "../components/ProfileComponents/ProfilePostCard";
import UnicefBanner from "../components/HomeComponents/UnicefBanner";
import LeftSidebar from "../components/LeftSidebar/LeftSidebar";
import { useParams } from "react-router";
import axios from "axios";
import { useState } from "react";
import ProfileCover from "../components/ProfileComponents/ProfileCover";
import { useSelector } from "react-redux";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);

  // const [user, setuser] = useState({});


  //! fetching user posts
  //dummy datas


  const PublicFile = process.env.REACT_APP_PUBLIC_FOLDER;

  const userId= JSON.parse(localStorage.getItem('userIdLocal'))
  // console.log(userId, "iiidd");

  const [user, setUser]= useState({});
  console.log(user,"usersList")


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${userId}`);
      // console.log(res,"i user")
      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (userId) {
      axios.get(`/post/profile/${userId}`).then((res) => {
        setUserPosts(res.data);
      });
    }
  }, [userId]);

  //! fetching user

  
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
          <Box py="3.8rem" flex="1">
            <ProfileCover user={user} />
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
                  <ProfilePostCard
                    key={el._id}
                    userPost={el}
                    user={user}
                  />
                );
              })}
            </SimpleGrid>
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
            Login To access <span style={{ color: "#00caf7", fontSize: "55px"}}> Profile </span> <span style={{ color: "tomato",fontSize: "55px" }}>!</span>{" "}
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
