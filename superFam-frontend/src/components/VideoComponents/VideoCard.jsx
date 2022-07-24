import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import playBtn from "../../assets/playbutton.svg";

const VideoCard = ({ video, ind }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentVideo, setCurrentVideo]= useState()

  console.log(currentVideo, "video");

  const handleClick = () => {
    console.log(video?.id.videoId,"video id")
    setCurrentVideo(video?.id.videoId)
    onOpen();
  };
  return (
    <>
      <Center position="relative">
        <Center h="12rem" overflow="hidden" role="group" borderRadius="12px">
          <Image
            objectFit="cover"
            src={video?.snippet.thumbnails.high.url}
            transition="all .2s ease"
            filter= 'brightness(50%)'
            _groupHover={{ transition: "all .4s ease",  filter: 'brightness(100%)' }}
          />
          <Center position="absolute" top="45%" bottom="45%" w="2rem" h="2rem">
            <Image
              onClick={handleClick}
              cursor="pointer"
              transition="all .3s ease"
              opacity="0"
              _groupHover={{
                transition: "all .4s ease",
                transform: "scale(2)",
                opacity: ".8",
              }}
              src={playBtn}
            />
          </Center>
          <Text
            className="videoCount"
            color="white"
            position="absolute"
            fontSize="50px"
            bottom="-18%"
            opacity=".5"
            right="6%"
            zindex="200"
            transition="all .3s ease"
            _groupHover={{ opacity: "1", transition: "all .4s ease", transform:"translateY(-10px)" }}
          >
            {ind + 1}{" "}
          </Text>
        </Center>
      </Center>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={["4xl","6xl"]}
      >
        <ModalOverlay
          bg="#00000070"
          backdropFilter="blur(10px) hue-rotate(10deg)"
        />
        <ModalContent mt="7rem" borderRadius="25px" overflow="hidden">
          <ModalCloseButton color="white" fontSize="15px" />
          <ModalBody p="0">
            <AspectRatio maxW="1160"   ratio={2}>
              <iframe
                // height="615"
                src={`https://www.youtube.com/embed/${currentVideo}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              ></iframe>
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoCard;
