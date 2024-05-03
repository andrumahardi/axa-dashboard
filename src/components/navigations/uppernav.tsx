"use client";

import { LOCAL_ASSETS } from "@/constants";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, IconButton, Text } from "@chakra-ui/react";
import { ImageFill } from "@/components/images";

type Props = {
  onClick: () => void;
};

export function UpperNav({ onClick }: Props) {
  return (
    <HStack
      p={2}
      w="full"
      boxShadow="4px 10px 20px #0000003d"
      bgColor="#ffffff"
      justifyContent="space-between"
    >
      <IconButton aria-label="drawer-icon" variant="ghost" onClick={onClick}>
        <HamburgerIcon boxSize="20px" />
      </IconButton>
      <Box px="8">
        <HStack spacing={4}>
          <ImageFill
            src={LOCAL_ASSETS.PROFILE_PIC_DEFAULT}
            alt="profile picture"
            wrapperProps={{
              boxSize: "30px",
              borderRadius: "50%",
            }}
          />
          <Text>Andrew Schmidt</Text>
        </HStack>
      </Box>
    </HStack>
  );
}
