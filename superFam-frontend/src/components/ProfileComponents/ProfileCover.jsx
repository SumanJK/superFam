import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiSendPlane2Fill, RiSendPlaneFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  getTimelinePost,
  // uploadPicture,
  uploadProfilePicture,
} from "../../redux/post/action";
import {
  // MdCancelScheduleSend,
  // MdDoneAll,
  MdOutlineCancelScheduleSend,
} from "react-icons/md";
// import { TiCancel } from "react-icons/ti";
import axios from "axios";
// import { getAuthUser } from "../../redux/auth/action";

const ProfileCover = ({ user }) => {
  const PublicFile = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(PublicFile,"PublicFile")
  // console.log(PublicFile, user?.profilePicture, "PF");

  const {
    isOpen: isCoverEditOpen,
    onOpen: onCoverEditOpen,
    onClose: onCoverEditClose,
  } = useDisclosure();
  const {
    isOpen: isProfileEditOpen,
    onOpen: onProfileEditOpen,
    onClose: onProfileEditClose,
  } = useDisclosure();

  const toast = useToast();
  const [coverPic, setCoverPic] = useState(null);
  // console.log(coverPic, "cover");
  const [profilePic, setProfilePic] = useState(null);
  // console.log(profilePic, "profile");

  const dispatch = useDispatch();
  const userId = useSelector((store) => store.auth.userId);
  console.log(userId,"userIDD")

  //uploading cover pic
  const handleCoverUpload = () => {
    const updateProfile = {
      userId: userId,
    };
    if (coverPic) {
      const data = new FormData();
      const fileName = coverPic.name;

      data.append("name", fileName);
      data.append("file", coverPic);

      updateProfile.coverPicture = fileName;

      dispatch(uploadProfilePicture(data, updateProfile, user._id, toast));

      onCoverEditClose();
    }
  };
  //uploading profile pic

  const handleProfileUpload = () => {
    const updateProfile = {
      userId: userId,
    };
    if (profilePic) {
      const data = new FormData();
      const fileName = profilePic.name;

      data.append("name", fileName);
      data.append("file", profilePic);

      updateProfile.profilePicture = fileName;
      // console.log(data, "newpostData");
      dispatch(uploadProfilePicture(data, updateProfile, user._id, toast));

      onProfileEditClose();
    }
  };

  //follow / unfollow user

  const userDetails = useSelector((store) => store.auth.userDetails);

  console.log(user, userDetails, "userIIDIDIDIDI");

  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(userDetails?.following?.includes(user._id));
  }, [userDetails, user]);

  // console.log(like, "LIKES");

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  //! followHandler

  const followHandler = () => {
    if (!userId) {
      toast({
        title: "Login to follow a user!",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } else {
      try {
        axios
          .put("https://superfam-backend-production.up.railway.app/api/user/" + user._id + "/follow", { userId: userId })
          .then((res) => {
            toast({
              title: res.data,
              status: "success",
              duration: 1000,
              isClosable: true,
            });
            setFollowed(true);
          })
          .then(() => {
            axios.get(`https://superfam-backend-production.up.railway.app/api/user/${user?._id}`).then((res) => {
              console.log("res", res);
              setCurrentUser(res.data);
            });
          })
          .catch((err) => {
            toast({
              title: err.response.data,
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          });
      } catch (err) {
        console.log(err, "erererre");
        toast({
          title: err.response.data,
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    }
  };

  //! unfollowHandler
  const unfollowHandler = () => {
    if (!userId) {
      toast({
        title: "Login to follow a user!",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    } else {
      try {
        axios
          .put("https://superfam-backend-production.up.railway.app/api/user/" + user._id + "/unfollow", { userId: userId })
          .then((res) => {
            toast({
              title: res.data,
              status: "success",
              duration: 1000,
              isClosable: true,
            });
            setFollowed(false);
          })
          .then(() => {
            dispatch(getTimelinePost(toast));
          })
          .then(() => {})
          .catch((err) => {
            toast({
              title: err.response.data,
              status: "error",
              duration: 1000,
              isClosable: true,
            });
          });
      } catch (err) {
        console.log(err, "erererre");
        toast({
          title: err.message,
          status: "error",
          duration: 1000,
          isClosable: true,
        });
      }
    }
  };
  return (
    <>
      <Flex
        h={["12rem", "27rem"]}
        className="profileCoverWrapper"
        position="relative"
        mb="2rem"
        // border="1px solid black"
        w={["100%", "100%", "100%", "100%", "100%"]}
        direction="column"
        justifyContent="space-between"
      >
        <Box
          className="ProfileCoverPicDiv"
          h={["7rem", "20rem"]}
          boxShadow="  rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px"
        >
          <Image
            h="100%"
            w="100%"
            objectFit="cover"
            src={PublicFile + user?.coverPicture}
            alt="cover pic"
          />
          <Flex justify="end" p="0rem .4rem" position="relative" align="center">
            <FiEdit
              position="absolute"
              top="0"
              right="0"
              fontSize="20px"
              color="#ff7979"
              cursor="pointer"
              onClick={onCoverEditOpen}
            />
          </Flex>
        </Box>
        <Center
          position="absolute"
          left={["40%", "45%"]}
          right={["40%", "45%"]}
          bottom={["20%", "10%"]}
          // border="1px solid black"
          w={["5rem", "7.5rem"]}
          h={["5rem", "7.5rem"]}
        >
          <Center
            position="relative"
            zIndex="20"
            bg="#fff"
            w={["4rem", "7.5rem"]}
            h={["4rem", "7.5rem"]}
            // border="1px solid red"
            borderRadius="50%"
            boxShadow=" rgb(204, 219, 232) 3px 2px 6px 1px inset, rgb(255, 255, 255) -3px -2px 4px 0px inset"
          >
            <Image
              cursor={"pointer"}
              boxShadow=" rgba(136, 165, 191, 0.68) 6px 2px 16px 0px, rgba(255, 255, 255, .5) -6px -2px 16px 0px"
              borderRadius="50%"
              w="85%"
              h="85%"
              objectFit={"cover"}
              transition="0.2s ease all"
              _hover={{ transform: "scale(1.2) ", transition: "0.5s ease all" }}
              src={PublicFile + user?.profilePicture}
              alt="profile pic"
            />
            <Flex position="absolute" bottom="0" right="0">
              <FiEdit
                fontSize="16px"
                color="#ff7979"
                cursor="pointer"
                onClick={onProfileEditOpen}
              />
            </Flex>
          </Center>
        </Center>
        <Flex
          justify="center"
          align="center"
          // w={["10rem", "20rem"]}
          py={["0", "0"]}
          h={["3rem", "2rem"]}
          margin="0 auto"
          w="100%"
          position="relative"
        >
          <Text
            color="#32526a"
            fontSize={["13px", "18px"]}
            fontWeight={"600"}
            noOfLines={1}
            cursor={"pointer"}
            className="userPostFont"
          >
            {user?.username}
          </Text>
          <Button
            position="absolute"
            display="flex"
            align="center"
            right="2%"
            justify="center"
            transition="all .3s ease"
            borderRadius="20px"
            w={["6rem", "10rem"]}
            h={["2rem", "3rem"]}
            bg='#2c2c2c'
            color='#fff'
            py="1"
            textAlign="center"
            boxShadow="6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff"
            _hover={{
              color: "#ffffff",
              transition: "all .4s ease",
              transform: "scale(1.1)",
              bg: "#ff3838eb",
              boxShadow:
                " rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
            onClick={followed ? unfollowHandler : followHandler}
          >
            {" "}
            {followed ? "unfollow" : "follow"} &nbsp;
            <RiSendPlane2Fill  fontSize="20px" />
          </Button>
        </Flex>
      </Flex>
      <Modal
        isOpen={isCoverEditOpen}
        onClose={onCoverEditClose}
        size={["xs", "sm", "md", "lg", "xl"]}
      >
        <ModalOverlay
          bg="#0000007f"
          backdropFilter="blur(10px) hue-rotate(10deg)"
        />
        <ModalContent mt="7rem" borderRadius="25px" overflow="hidden">
          <ModalBody p="0">
            <Box>
              <Box
                border="3px solid black"
                h="50%"
                borderRadius="25px"
                overflow="hidden"
              >
                {coverPic && (
                  <Box className="shareImgContainer" position="relative">
                    <Image
                    borderRadius="25px"
                      src={URL.createObjectURL(coverPic)}
                      alt="cover pic"
                    />
                    <Button
                      position="absolute"
                      top="0"
                      w={["3rem", "4rem"]}
                      h={["1.5rem", "2.2rem"]}
                      p="0"
                      right="0"
                      borderRadius="0"
                      transition="all .5s ease"
                      boxShadow="  rgba(255, 0, 0, 0.367) 0px -23px 25px 0px inset, rgba(255, 0, 0, 0.285) 0px -36px 30px 0px inset, rgba(255, 0, 0, 0.258) 0px -79px 40px 0px inset, rgba(255, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.051) 0px 4px 2px, rgba(0, 0, 0, 0.067) 0px 8px 4px, rgba(0, 0, 0, 0.125) 0px 16px 8px, rgba(0, 0, 0, 0.062) 0px 32px 16px"
                      _hover={{ bg: "#ff0000cc", transition: "all .5s ease" }}
                      bg="transparent"
                      borderBottomLeftRadius={"24px"}
                      borderTopRightRadius={"20px"}
                      onClick={() => setCoverPic(null)}
                    >
                      <MdOutlineCancelScheduleSend
                        color="#ffffffe7"
                        fontSize={["18px"]}
                      />
                    </Button>
                  </Box>
                )}
              </Box>
              <Flex
                py="2rem"
                direction="column"
                justify="center"
                align="center"
                h="50%"
              >
                <Input
                  border="none"
                  type="file"
                  opacity="1"
                  w="50%"
                  cursor="pointer"
                  id="fileCover"
                  accept="image/*"
                  onChange={(e) => setCoverPic(e.target.files[0])}
                />
                <Text fontSize="14px" fontWeight="bold" color="#363636" pt="5%">
                  {coverPic ? (
                    <Image data={coverPic} borderRadius="25px" />
                  ) : (
                    "Please choose a cover picture"
                  )}
                </Text>
                {coverPic && (
                  <Button
                    display="flex"
                    align="center"
                    justify="center"
                    boxShadow="  rgba(255, 0, 0, 0.418) 0px -23px 25px 0px inset, rgba(255, 0, 0, 0.313) 0px -36px 30px 0px inset, rgba(255, 0, 0, 0.235) 0px -79px 40px 0px inset, rgba(255, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.051) 0px 4px 2px, rgba(0, 0, 0, 0.067) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.008) 0px 32px 16px"
                    ml="1rem"
                    transition="all .5s ease"
                    borderRadius="20px"
                    w={["8rem", "10rem"]}
                    h={["2rem", "3rem"]}
                    p="0"
                    color="white"
                    _hover={{
                      color: "black",
                      transition: "all .4s ease",
                      transform: "scale(1.1)",
                      boxShadow:
                        " rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                    }}
                    onClick={handleCoverUpload}
                  >
                    {" "}
                    Upload &nbsp;
                    <RiSendPlaneFill fontSize="20px" />
                  </Button>
                )}
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isProfileEditOpen}
        onClose={onProfileEditClose}
        size={["xs", "sm", "md", "lg", "xl"]}
      >
        <ModalOverlay
          bg="#0000007f"
          backdropFilter="blur(10px) hue-rotate(10deg)"
        />
        <ModalContent mt="7rem" borderRadius="25px" overflow="hidden">
          <ModalBody p="0">
            <Box>
              <Box border="3px solid black" h="50%" borderRadius="25px">
                {profilePic && (
                  <Box className="shareImgContainer" position="relative">
                    <Image
                    borderRadius="25px"
                      src={URL.createObjectURL(profilePic)}
                      alt="cover pic"
                    />
                    <Button
                      position="absolute"
                      top="0"
                      w={["3rem", "4rem"]}
                      h={["1.5rem", "2.2rem"]}
                      p="0"
                      right="0"
                      borderRadius="0"
                      transition="all .5s ease"
                      boxShadow="  rgba(255, 0, 0, 0.367) 0px -23px 25px 0px inset, rgba(255, 0, 0, 0.285) 0px -36px 30px 0px inset, rgba(255, 0, 0, 0.258) 0px -79px 40px 0px inset, rgba(255, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.051) 0px 4px 2px, rgba(0, 0, 0, 0.067) 0px 8px 4px, rgba(0, 0, 0, 0.125) 0px 16px 8px, rgba(0, 0, 0, 0.062) 0px 32px 16px"
                      _hover={{ bg: "#ff0000cc", transition: "all .5s ease" }}
                      bg="transparent"
                      borderBottomLeftRadius={"24px"}
                      borderTopRightRadius={"20px"}
                      onClick={() => setProfilePic(null)}
                    >
                      <MdOutlineCancelScheduleSend
                        color="#ffffffe7"
                        fontSize={["18px"]}
                      />
                    </Button>
                  </Box>
                )}
              </Box>
              <Flex
                py="2rem"
                direction="column"
                justify="center"
                align="center"
                h="50%"
              >
                <Input
                  border="none"
                  type="file"
                  opacity="1"
                  w="50%"
                  cursor="pointer"
                  id="fileProfile"
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
                <Text fontSize="14px" fontWeight="bold" color="#363636" pt="5%">
                  {profilePic ? (
                    <Image data={profilePic} />
                  ) : (
                    "Please choose a Profile picture"
                  )}
                </Text>
                {profilePic && (
                  <Button
                    display="flex"
                    align="center"
                    justify="center"
                    boxShadow="  rgba(255, 0, 0, 0.418) 0px -23px 25px 0px inset, rgba(255, 0, 0, 0.313) 0px -36px 30px 0px inset, rgba(255, 0, 0, 0.235) 0px -79px 40px 0px inset, rgba(255, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.051) 0px 4px 2px, rgba(0, 0, 0, 0.067) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.008) 0px 32px 16px"
                    ml="1rem"
                    transition="all .5s ease"
                    borderRadius="20px"
                    w={["8rem", "10rem"]}
                    h={["2rem", "3rem"]}
                    p="0"
                    color="white"
                    _hover={{
                      color: "black",
                      transition: "all .4s ease",
                      transform: "scale(1.1)",
                      boxShadow:
                        " rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                    }}
                    onClick={handleProfileUpload}
                  >
                    {" "}
                    Upload &nbsp;
                    <RiSendPlaneFill fontSize="20px" />
                  </Button>
                )}
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileCover;
