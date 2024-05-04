"use client";

import { Box, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BasicTable } from "@/components/table";
import { URLS } from "@/constants";
import { useAlbums } from "./use-albums";

const rootUrl = URLS.ALBUMS;

export function Albums() {
  const { albums } = useAlbums({ page: "", pageSize: "" });
  return (
    <>
      <Box bgColor="#ffffff" borderRadius="10px">
        <HStack
          p={4}
          borderBottom="1px solid"
          borderColor="#eaeaea"
          justifyContent="space-between"
        >
          <Text>Album List</Text>
        </HStack>
        {albums.length ? (
          <VStack p={4} alignItems="flex-start" spacing={4}>
            <HStack w="full" justifyContent="space-between">
              <HStack justifyContent="space-between">
                <HStack>
                  <Text>Search: </Text>
                  <Input />
                </HStack>
              </HStack>
            </HStack>
            <Box w="full">
              <BasicTable
                data={albums}
                headColumns={[
                  {
                    key: "id",
                    name: "ID",
                  },
                  {
                    key: "title",
                    name: "Title",
                  },
                  {
                    key: "user",
                    name: "User",
                  },
                ]}
                handleDelete={() => {}}
                rootUrl={rootUrl}
              />
            </Box>
          </VStack>
        ) : (
          <VStack p={4}>
            <Text>This table is empty ;(</Text>
          </VStack>
        )}
      </Box>
    </>
  );
}
