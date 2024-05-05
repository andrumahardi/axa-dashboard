import { DeleteIcon } from "@chakra-ui/icons";
import {
  FormControl,
  HStack,
  Button,
  FormErrorMessage,
  Box,
  Text,
  InputProps,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  error: string;
  fileName: string | undefined;
  onClick: React.MouseEventHandler;
  onChange: React.ChangeEventHandler;
  htmlName: string;
} & Pick<InputProps, "size">;

export function BasicFileField({
  error,
  fileName,
  onClick,
  onChange,
  htmlName,
  ...props
}: Props) {
  function removeFile(e: React.MouseEvent<HTMLButtonElement>) {
    (document.getElementById(htmlName) as HTMLInputElement).value = "";
    onClick(e);
  }

  return (
    <FormControl isInvalid={!!error}>
      <HStack
        justifyContent="space-between"
        {...(error
          ? {
              border: "2px solid",
              borderColor: "red.500",
            }
          : {
              border: "1px solid",
              borderColor: "gray.200",
            })}
        borderRadius="md"
        p={2}
      >
        {fileName ? (
          <>
            <Box px={2}>
              <Text
                {...(props.size ? { fontSize: props.size } : {})}
                noOfLines={1}
              >
                {fileName}
              </Text>
            </Box>
            <Button
              name={htmlName}
              onClick={removeFile}
              h="unset"
              variant="ghost"
              p={0}
              colorScheme="red"
            >
              <DeleteIcon boxSize="15px" />
            </Button>
          </>
        ) : (
          <>
            <HStack>
              <Button size="sm" as="label" htmlFor={htmlName} cursor="pointer">
                Upload Image
              </Button>
              <Text color="gray.500" fontSize={props.size || "sm"}>
                JPG or PNG only
              </Text>
            </HStack>
            <Text color="gray.500" fontSize={props.size || "sm"}>
              (Max 5 MB)
            </Text>
          </>
        )}
        <input
          name={htmlName}
          onChange={onChange}
          type="file"
          id={htmlName}
          style={{ display: "none" }}
          accept="image/jpg,image/png"
        />
      </HStack>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
