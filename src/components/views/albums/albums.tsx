"use client";

import { Box, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BasicTable } from "@/components/table";
import { URLS } from "@/constants";
import { useAlbums } from "./use-albums";
import { BasicTableSkeleton } from "@/components/table/basic-table-skeleton";

const rootUrl = URLS.ALBUMS;

export function Albums() {
  const { albums, isLoading } = useAlbums({ page: "", pageSize: "" });
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

        <VStack p={4}>
          {isLoading ? (
            <BasicTableSkeleton />
          ) : (
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
          )}
        </VStack>
      </Box>
    </>
  );
}
