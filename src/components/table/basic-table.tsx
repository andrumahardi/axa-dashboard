import {
  Box,
  HStack,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BasicRowActionBtns } from "./basic-row-action-btns";

export type BasicTableProps = {
  data: Record<string, any>[];
  headColumns: Array<{ key: string; name: string }>;
  handleDelete: (id: number) => void;
  rootUrl: string;
  isReadOnly?: boolean;
  hasActionColumn?: boolean;
};

export function BasicTable({
  data,
  headColumns,
  handleDelete,
  rootUrl,
  isReadOnly,
  hasActionColumn,
}: BasicTableProps) {
  if (!data.length) return <Text>This table is empty ;(</Text>;

  return (
    <>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              {headColumns.map((col, i) => (
                <React.Fragment key={i + 1}>
                  <Th>{col.name}</Th>
                </React.Fragment>
              ))}
              {hasActionColumn ? <Th>Actions</Th> : null}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                <Tr>
                  {headColumns.map((col, i) => (
                    <React.Fragment key={i + 1}>
                      <Td>{item[col.key]}</Td>
                    </React.Fragment>
                  ))}
                  {hasActionColumn ? (
                    <Td>
                      <BasicRowActionBtns
                        links={{
                          view: `${rootUrl}/${item.id}`,
                          edit: `${rootUrl}/form/${item.id}`,
                        }}
                        onDelete={() => handleDelete(item.id)}
                        isReadOnly={isReadOnly}
                      />
                    </Td>
                  ) : null}
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
