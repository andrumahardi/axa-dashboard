import { VStack, HStack, Skeleton } from "@chakra-ui/react";
import React from "react";

export function BasicTableSkeleton() {
  return (
    <VStack spacing={4} w="full">
      <HStack justifyContent="flex-end" w="full">
        <Skeleton h="30px" w="100px" />
      </HStack>
      {Array.from(Array(10)).map((_, i) => (
        <React.Fragment key={`row-skeleton-${i + 1}`}>
          <Skeleton h="30" w="full" />
        </React.Fragment>
      ))}
      <HStack w="full" mt={4} justifyContent="space-between">
        <Skeleton h="20px" w="50%" />
        <HStack justifyContent="space-between">
          {Array.from(Array(5)).map((_, i) => (
            <React.Fragment key={`pages-skeleton-${i + 1}`}>
              <Skeleton boxSize="30px" borderRadius="md" />
            </React.Fragment>
          ))}
        </HStack>
      </HStack>
    </VStack>
  );
}
