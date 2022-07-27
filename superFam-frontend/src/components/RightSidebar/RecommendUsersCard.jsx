import { Box, Flex, Image, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { RiHeartAddFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../redux/auth/action";
import { getTimelinePost } from "../../redux/post/action";

const RecommendUsersCard = ({ recUser }) => {
  const PublicFile = process.env.REACT_APP_PUBLIC_FOLDER;

  const userId = useSelector((store) => store.auth.userId);
  const userDetails = useSelector((store) => store.auth.userDetails);


  const dispatch= useDispatch();

  const [followed, setFollowed] = useState(false);

  const toast = useToast();

  useEffect(() => {
    setFollowed(userDetails.following.includes(recUser._id));
  }, [userDetails, recUser]);


  // console.log(like, "LIKES");

    //! followHandler

  const followHandler = () => {
    if(!userId){
      toast({
        title: 'Login to follow a user!',
        status:"info" ,
        duration: 2000,
        isClosable: true,
      });
    }else{

      try {
        axios
          .put("/user/" + recUser._id + "/follow", { userId: userId })
          .then((res) => {
            toast({
              title: res.data,
              status:"success" ,
              duration: 1000,
              isClosable: true,
            });
            setFollowed(true);
          }).then(()=>{
            dispatch(getTimelinePost(toast))
          }).then(()=>{
            dispatch(getAuthUser())
          }).catch((err)=>{
            toast({
              title: err.response.data,
              status:"error" ,
              duration: 2000,
              isClosable: true,
            });
          })
          
      }catch(err){
        console.log(err,"erererre")
        toast({
          title: err.response.data,
          status:"error" ,
          duration: 1000,
          isClosable: true,
        });
      }
      
    }
  };

  //! unfollowHandler
  const unfollowHandler = () => {
    if(!userId){
      toast({
        title: 'Login to follow a user!',
        status:"info" ,
        duration: 2000,
        isClosable: true,
      });
    }else{

      try {
        axios
          .put("/user/" + recUser._id + "/unfollow", { userId: userId })
          .then((res) => {
            toast({
              title: res.data,
              status:"success" ,
              duration: 1000,
              isClosable: true,
            });
            setFollowed(false);
          }).then(()=>{
            dispatch(getTimelinePost(toast))
          }).then(()=>{
            dispatch(getAuthUser())
          }).catch((err)=>{
            toast({
              title: err.response.data,
              status:"error" ,
              duration: 1000,
              isClosable: true,
            });
          })
         
      }catch (err) {
        console.log(err,"erererre")
        toast({
          title: err.message,
          status:"error" ,
          duration: 1000,
          isClosable: true,
        });
      }
      
    }
  };

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
          boxShadow: " rgba(0, 0, 0, 0.09) 0px 3px 12px",
          border: "1.5px solid #4dc1ff",
          bg: "#def3ff",
          transition: "all 0.3s ease",
        }}
      >
        <Link to={`/profile/${recUser._id}`}>
          <Flex  align='center'>
        <Box borderRadius="50%" overflow="hidden" w="1.8rem" h="1.8rem">
          <Image w="100%" src={PublicFile + recUser?.profilePicture} />
        </Box>
        <Box w="8.5rem">
          <Text color="#5f6165" fontSize="14px" fontWeight="600" noOfLines={1}>
            {recUser?.username}
          </Text>
        </Box>
        </Flex>
        </Link>
        <Flex w="2rem" align="center" justify="center">
          {!followed && (
            <RiHeartAddFill
              fontSize="18px"
              cursor="pointer"
              color="#4dc1ff"
              onClick={followHandler}
            />
          )}
          {followed && <IoMdDoneAll fontSize="18px" color="#00e686" cursor="pointer"  onClick={unfollowHandler} />}
        </Flex>
      </Flex>
  );
};

export default RecommendUsersCard;
