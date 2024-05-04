import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { usePost } from "./use-post";
import { URLS } from "@/constants";
import { BasicTable } from "@/components/table";

export function PostDetail() {
  const {
    state,
    toggleEdit,
    postComments,
    setToggleEdit,
    onChange,
    onSave,
    onCancel,
  } = usePost();

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
            <FormLabel fontWeight="semibold">Post Title</FormLabel>
            <Input
              onChange={onChange}
              readOnly={!toggleEdit}
              name="title"
              value={state.title}
            />
          </FormControl>

          <FormControl w="full">
            <FormLabel fontWeight="semibold">Created By</FormLabel>
            <Input
              onChange={onChange}
              readOnly
              name="user"
              value={state.user}
            />
          </FormControl>

          <FormControl w="full">
            <FormLabel fontWeight="semibold">User Email</FormLabel>
            <Input
              onChange={onChange}
              readOnly
              name="email"
              value={state.email}
            />
          </FormControl>

          <FormControl w="full">
            <FormLabel fontWeight="semibold">Post Content</FormLabel>
            <Textarea
              onChange={onChange}
              readOnly={!toggleEdit}
              name="body"
              value={state.body}
            />
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

      <Box mt={4} p={4} bgColor="#ffffff" borderRadius="md">
        <Text fontSize="xl" fontWeight="bold">
          Post Comments
        </Text>
        <Box w="full" mt={4}>
          <BasicTable
            data={postComments}
            headColumns={[
              {
                key: "id",
                name: "ID",
              },
              {
                key: "name",
                name: "Title",
              },
              {
                key: "email",
                name: "User Email",
              },
              {
                key: "body",
                name: "Content",
              },
            ]}
            handleDelete={() => {}}
            hasActionColumn
            isReadOnly={false}
            rootUrl={URLS.COMMENTS}
          />
        </Box>
      </Box>
    </>
  );
}
