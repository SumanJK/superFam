import { Box } from '@chakra-ui/react';
import React, { useState } from 'react'
import Heart from "react-heart"


function PostCardHeart() {
  const [active, setActive] = useState(false)
	return (
		<Box   width= "1.3rem" h="1.35rem" mr=".6rem" >
			<Heart   isActive={active} onClick={() => setActive(!active)}/>
		</Box>
	);
}

export default PostCardHeart