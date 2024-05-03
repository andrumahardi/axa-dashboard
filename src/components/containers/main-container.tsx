"use client";

import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { SideNav, UpperNav } from "../navigations";
import { usePathname } from "next/navigation";
import { Footer } from "../footers";

const sidenavWidth = "250px";

export function MainContainer({ children }: { children: React.ReactNode }) {
  const [navWidth, setNavWidth] = useState(sidenavWidth);
  const pathname = usePathname();

  function compressNav() {
    if (navWidth === sidenavWidth) {
      setNavWidth("0px");
    } else {
      setNavWidth(sidenavWidth);
    }
  }

  return (
    <Flex bgColor="#f4f6f9">
      <Box
        w={navWidth}
        transition="all .5s"
        h="100vh"
        overflowY="auto"
        overflowX="hidden"
      >
        <Box w={sidenavWidth} h="full">
          <SideNav
            activeLink={pathname || "/"}
            isCompressed={navWidth !== sidenavWidth}
          />
        </Box>
      </Box>
      <Box
        transition="all .5s"
        w={`calc(100% - ${navWidth})`}
        h="100vh"
        overflow="auto"
      >
        <Box
          transition="all .5s"
          position="fixed"
          top={0}
          right={0}
          w={`calc(100% - ${navWidth})`}
          zIndex={999}
        >
          <UpperNav onClick={compressNav} />
        </Box>
        <Box minH="100vh" position="relative" overflow="auto">
          <Box pt={20} pb={4} px={4} mb={14}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Flex>
  );
}
