"use client";

import { sidemenu } from "@/constants";
import {
  Box,
  Divider,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  activeLink: string;
  isCompressed: boolean;
};

type NavButtonProps = {
  link: string;
  name: string;
  isActive: boolean;
};

const linkButtonColor = "#c2c7d0";
const linkHoverBgColor = "#ffffff1a";

export function SideNav({ activeLink }: Props) {
  return (
    <VStack bgColor="#003e81" alignItems="flex-start" minH="100vh" pb={4}>
      <Box w="full">
        <Text fontSize="20px" color="#c2c7d0" px={2} py={3}>
          Content Management
        </Text>
        <Divider h="4px" w="full" color="#ffffff1a" />
      </Box>
      {sidemenu.map((menu) => (
        <React.Fragment key={menu.name}>
          <Box px={2} w="full">
            <NavButton
              isActive={activeLink === menu.link}
              name={menu.name}
              link={menu.link || "/"}
            />
          </Box>
        </React.Fragment>
      ))}
    </VStack>
  );
}

function NavButton({ isActive, link, name }: NavButtonProps) {
  return (
    <LinkBox
      px={4}
      py={2}
      bgColor={isActive ? "#007bff" : ""}
      _hover={{
        bgColor: isActive ? "" : linkHoverBgColor,
      }}
      borderRadius="5px"
      {...(isActive ? { boxShadow: "4px 10px 20px #0000003d" } : {})}
    >
      <LinkOverlay
        fontWeight="medium"
        href={link}
        color={isActive ? "#ffffff" : linkButtonColor}
      >
        {name}
      </LinkOverlay>
    </LinkBox>
  );
}
