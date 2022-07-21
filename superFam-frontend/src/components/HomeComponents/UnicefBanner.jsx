import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Image, Link } from "@chakra-ui/react";
import React from "react";

const UnicefBanner = () => {
  return (
    <Flex h="72px" py="20px" justify="center" align="center" bg="#f5f5f7"  m="auto">
      {/* <Image px="10px" w="8rem" src="https://www.apple.com/v/home/aq/images/logos/unicef-relief-fund/unicef_logo_dark__ejvlglygb3ee_large_2x.png" /> */}
      <Link fontSize="14px" letterSpacing="-0.374px" href="itmss://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/buyCharityGiftWizard?charity=10220" isExternal color="#1c75d0">
        Donate to support families affected by the war in Ukraine
        <ExternalLinkIcon mx="2px" />
      </Link>
    </Flex>
  );
};

export default UnicefBanner;
