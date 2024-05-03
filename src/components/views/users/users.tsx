"use client";

import { Box, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { DynamicTable } from "@/components/table";
import { URLS } from "@/constants";

const rootUrl = URLS.USERS;

export function Users() {
  return (
    <>
      <Box bgColor="#ffffff" borderRadius="10px">
        <HStack
          p={4}
          borderBottom="1px solid"
          borderColor="#eaeaea"
          justifyContent="space-between"
        >
          <Text>User List</Text>
        </HStack>
        {[].length ? (
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
              <DynamicTable
                data={[]}
                headColumns={[
                  {
                    key: "id",
                    name: "ID",
                  },
                  {
                    key: "username",
                    name: "User Name",
                  },
                  {
                    key: "email",
                    name: "Email",
                  },
                ]}
                toggleSelectRow={() => {}}
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
