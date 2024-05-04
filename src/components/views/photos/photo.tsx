"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { usePhoto } from "./use-photo";
import { ImageFill, ImageFixed } from "@/components/images";
import { BasicFileField } from "@/components/inputs";
import { ChangeEvent } from "react";

export function PhotoDetail() {
  const {
    state,
    toggleEdit,
    setToggleEdit,
    onChange,
    onSave,
    onCancel,
    onChangeFile,
    removeFile,
  } = usePhoto();

  return (
    <>
      <Box bgColor="#ffffff" borderRadius="md">
        <HStack p={4} justifyContent="space-between">
          <Text fontSize="xl" fontWeight="bold">
            Detail Post
          </Text>
          {!toggleEdit ? (
            <Button
              variant="outline"
              colorScheme="blue"
              onClick={() => setToggleEdit(!toggleEdit)}
            >
              Edit
            </Button>
          ) : null}
        </HStack>

        <VStack p={4} spacing={4}>
          <FormControl w="full">
            <FormLabel fontWeight="semibold">Image Title</FormLabel>
            <Input
              onChange={onChange}
              readOnly={!toggleEdit}
              name="title"
              value={state.title}
            />
          </FormControl>

          <FormControl w="full">
            <FormLabel fontWeight="semibold">Album Name</FormLabel>
            <Input
              onChange={onChange}
              readOnly
              name="album"
              value={state.album}
            />
          </FormControl>

          <FormControl w="full">
            <FormLabel fontWeight="semibold">Image Url</FormLabel>
            <Box mb={4}>
              <ImageFixed
                src={state.url}
                alt="photo"
                width={600}
                height={0}
                style={{ borderRadius: "md" }}
              />
            </Box>
            {toggleEdit ? (
              <BasicFileField
                error={""}
                fileName={state.imageName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChangeFile("image", e.target.files)
                }
                onClick={() => removeFile("image")}
                htmlName="image"
              />
            ) : null}
          </FormControl>

          <FormControl w="full">
            <FormLabel fontWeight="semibold">Thumbnail</FormLabel>
            <Box mb={4}>
              <ImageFixed
                src={state.thumbnailUrl}
                alt="thumbnail"
                width={300}
                height={0}
                style={{ borderRadius: "md" }}
              />
            </Box>
            {toggleEdit ? (
              <BasicFileField
                error={""}
                fileName={state.thumbnailName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onChangeFile("thumbnail", e.target.files)
                }
                onClick={() => removeFile("thumbnail")}
                htmlName="thumbnail"
              />
            ) : null}
          </FormControl>
        </VStack>

        {toggleEdit ? (
          <HStack p={4} justifyContent="flex-end" spacing={4}>
            <Button variant="ghost" colorScheme="blue" onClick={onCancel}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onSave}>
              Save
            </Button>
          </HStack>
        ) : null}
      </Box>
    </>
  );
}
