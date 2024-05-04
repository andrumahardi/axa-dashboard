"use client";

import { Box, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BasicTable } from "@/components/table";
import { URLS } from "@/constants";
import { usePhotos } from "./use-photos";

const rootUrl = URLS.PHOTOS;

export function Photos() {
  const { photos } = usePhotos({ page: "", pageSize: "" });
  return (
    <>
      <Box bgColor="#ffffff" borderRadius="10px">
        <HStack
          p={4}
          borderBottom="1px solid"
          borderColor="#eaeaea"
          justifyContent="space-between"
        >
          <Text>Photo List</Text>
        </HStack>
        {photos.length ? (
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
                data={photos}
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
                    key: "album",
                    name: "Album Name",
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
