import { Button, HStack } from "@chakra-ui/react";

type Props = {
  onDelete: () => void;
  links: {
    view: string;
    edit: string;
  };
  isReadOnly?: boolean;
};

export function BasicRowActionBtns({
  onDelete,
  links,
  isReadOnly = true,
}: Props) {
  return (
    <HStack spacing={1}>
      <Button
        as="a"
        href={links.view}
        variant="outline"
        colorScheme="blue"
        size="xs"
      >
        View
      </Button>
      {!isReadOnly ? (
        <>
          <Button
            variant="solid"
            colorScheme="red"
            size="xs"
            onClick={onDelete}
          >
            Delete
          </Button>
        </>
      ) : null}
    </HStack>
  );
}
