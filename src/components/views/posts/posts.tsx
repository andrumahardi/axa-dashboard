"use client";

import { Box, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BasicTable } from "@/components/table";
import { URLS } from "@/constants";
import { usePosts } from "./use-posts";

const rootUrl = URLS.USERS;

export function Posts() {
  const { posts } = usePosts({ page: "", pageSize: "" });
  return (
    <>
      <Box bgColor="#ffffff" borderRadius="10px">
        <HStack
          p={4}
          borderBottom="1px solid"
          borderColor="#eaeaea"
          justifyContent="space-between"
        >
          <Text>Post List</Text>
        </HStack>
        {posts.length ? (
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
                data={posts}
                headColumns={[
                  {
                    key: "id",
                    name: "ID",
                  },
                  {
                    key: "user",
                    name: "User",
                  },
                  {
                    key: "title",
                    name: "Title",
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
