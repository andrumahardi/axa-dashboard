"use client";

import { Box, Grid, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BasicTable } from "@/components/table";
import { URLS } from "@/constants";
import { useUsers } from "./use-users";
import { BasicTableSkeleton } from "@/components/table/basic-table-skeleton";

const rootUrl = URLS.USERS;

export function Users() {
  const { contents, isLoading } = useUsers({ page: "", pageSize: "" });
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
        <VStack p={4}>
          {isLoading ? (
            <BasicTableSkeleton />
          ) : (
            <Box w="full">
              <BasicTable
                data={contents}
                headColumns={[
                  {
                    key: "id",
                    name: "ID",
                  },
                  {
                    key: "name",
                    name: "Name",
                  },
                  {
                    key: "username",
                    name: "Username",
                  },
                  {
                    key: "email",
                    name: "Email",
                  },
                  {
                    key: "phone",
                    name: "Phone",
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
