"use client";

import { Box, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BasicTable } from "@/components/table";
import { URLS } from "@/constants";
import { usePhotos } from "./use-photos";
import { BasicTableSkeleton } from "@/components/table/basic-table-skeleton";

const rootUrl = URLS.PHOTOS;

export function Photos() {
  const { photos, isLoading } = usePhotos({ page: "", pageSize: "" });
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

        <VStack p={4}>
          {isLoading ? (
            <BasicTableSkeleton />
          ) : (
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
          )}
        </VStack>
      </Box>
    </>
  );
}
