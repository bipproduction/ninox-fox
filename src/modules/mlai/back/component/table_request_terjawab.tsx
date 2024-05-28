import React, { useState } from 'react';
import funGetAllRequestMlai from '../fun/fun_get_all_request';
import { Box, Center, Group, Pagination, ScrollArea, Table } from '@mantine/core';
import ComponentTableRequest from './component_table_request';

export default function TableRequestTerjawab({ data, nPage }: { data: any, nPage: any }) {
  const [isData, setData] = useState(data)
  const [isNPage, setNPage] = useState(nPage)
  const [isChoosePage, setChoosePage] = useState(1)

  async function onClickPage(val: any) {
    const load = await funGetAllRequestMlai({ page: val, status: 1 })
    setChoosePage(val)
    setData(load.data)
    setNPage(load.nPage)
  }
  return (
    <>
      <Box pt={20}>
        <Box
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <ScrollArea>
            <Table
              withTableBorder
              withRowBorders={false}
              horizontalSpacing="xl"
            >
              <Table.Thead>
                <Table.Tr
                  style={{
                    borderBottom: "1px solid #CED4D9",
                  }}
                >
                  <Table.Th w={50}>No</Table.Th>
                  <Table.Th w={250} >Tanggal</Table.Th>
                  <Table.Th >User</Table.Th>
                  <Table.Th w={200}>
                    <Center>Aksi</Center>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              {isData.map((v: any, i: any) => (
                <ComponentTableRequest v={v} i={i} key={i} page={isChoosePage}/>
              ))}
            </Table>
          </ScrollArea>

          <Group justify="right" mt={20}>
            <Pagination
              value={isChoosePage}
              onChange={(val) => {
                onClickPage(val)
              }}
              total={isNPage}
            />
          </Group>
        </Box>
      </Box>
    </>
  );
}

