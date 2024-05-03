import {
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { BasicRowActionBtns } from "./basic-row-action-btns";

export type BasicTableProps = {
  data: Record<string, any>[];
  headColumns: Array<{ key: string; name: string }>;
  toggleSelectRow: (id: number) => void;
  handleDelete: (id: number) => void;
  rootUrl: string;
};

export function BasicTable({
  data,
  headColumns,
  toggleSelectRow,
  handleDelete,
  rootUrl,
}: BasicTableProps) {
  return (
    <>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>{""}</Th>
              {headColumns.map((col, i) => (
                <React.Fragment key={i + 1}>
                  <Th>{col.name}</Th>
                </React.Fragment>
              ))}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                <Tr>
                  <Td>
                    <Checkbox
                      isChecked={item.checked}
                      onChange={() => toggleSelectRow(item.id)}
                    />
                  </Td>
                  {headColumns.map((col, i) => (
                    <React.Fragment key={i + 1}>
                      <Td>{item[col.key]}</Td>
                    </React.Fragment>
                  ))}
                  <Td>
                    <BasicRowActionBtns
                      links={{
                        view: `${rootUrl}/${item.id}`,
                        edit: `${rootUrl}/form/${item.id}`,
                      }}
                      onDelete={() => handleDelete(item.id)}
                    />
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
