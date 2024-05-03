"use client";

import { HStack, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <HStack
      justifyContent="space-between"
      w="full"
      position="absolute"
      bottom={0}
      bgColor="#ffffff"
      p={4}
    >
      <Text>By Andru Mahardi</Text>
      <Text>{new Date().getFullYear()} © All rights reserved.</Text>
    </HStack>
  );
}
