"use client";

import { Box, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BasicTable } from "@/components/table";
import { URLS } from "@/constants";
import { usePosts } from "./use-posts";
import { BasicTableSkeleton } from "@/components/table/basic-table-skeleton";

const rootUrl = URLS.POSTS;

export function Posts() {
  const { posts, isLoading } = usePosts({ page: "", pageSize: "" });
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

        <VStack p={4}>
          {isLoading ? (
            <BasicTableSkeleton />
          ) : (
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
                hasActionColumn
                isReadOnly={false}
                rootUrl={rootUrl}
              />
            </Box>
          )}
        </VStack>
      </Box>
    </>
  );
}
