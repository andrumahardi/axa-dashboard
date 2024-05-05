"use client";

import { Box, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BasicTable } from "@/components/table";
import { URLS } from "@/constants";
import { useAlbums } from "./use-albums";
import { BasicTableSkeleton } from "@/components/table/basic-table-skeleton";

const rootUrl = URLS.ALBUMS;

export function Albums() {
  const { albums, users, selectedUserId, isLoading, onChange } = useAlbums();
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
            <>
              <HStack justifyContent="flex-end" w="full">
                <Box>
                  <Box mb={2}>
                    <Text fontWeight="semibold">
                      Filter By User&lsquo;s name:&nbsp;&nbsp;
                    </Text>
                  </Box>
                  <Select
                    name="userName"
                    onChange={onChange}
                    value={selectedUserId}
                    w="md"
                  >
                    {users.map((item) => (
                      <React.Fragment key={`user-${item.id}`}>
                        <option value={item.id}>{item.name}</option>
                      </React.Fragment>
                    ))}
                  </Select>
                </Box>
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
            </>
          )}
        </VStack>
      </Box>
    </>
  );
}
