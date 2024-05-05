"use client";

import { Box, HStack, Select, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BasicTable } from "@/components/table";
import { URLS } from "@/constants";
import { usePhotos } from "./use-photos";
import { BasicTableSkeleton } from "@/components/table/basic-table-skeleton";

const rootUrl = URLS.PHOTOS;

export function Photos() {
  const { photos, albums, isLoading, selectedAlbum, onChange } = usePhotos();
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
            <>
              <HStack justifyContent="flex-end" w="full">
                <Box>
                  <Box mb={2}>
                    <Text fontWeight="semibold">Select Album:&nbsp;&nbsp;</Text>
                  </Box>
                  <Select
                    name="albumTitle"
                    onChange={onChange}
                    value={selectedAlbum}
                  >
                    {albums.map((item) => (
                      <React.Fragment key={`album-${item.id}`}>
                        <option value={item.id}>
                          {item.id} - {item.title}
                        </option>
                      </React.Fragment>
                    ))}
                  </Select>
                </Box>
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
                  hasActionColumn
                  isReadOnly={false}
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
