"use client"
import { ActionIcon, Box, Group, ScrollArea, Table, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";



/**
 * Fungsi untuk mendapatkan nilai dari table.
 * @returns  Hasil menampilkan tabel beserta valuenya.
 */
export default function TableDataAudience({ title, data, th }: { title: string, data: any, th: any }) {
  const [isData, setData] = useState(data)

  useEffect(() => {
    setData(data)
  }, [data])

  return (
    <>
      <Box>
        <Box
          style={{
            backgroundColor: "gray",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text fw={"bold"} c={"white"}>
            {title}
          </Text>
          <Box pt={20}>
            <Box
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <ScrollArea>
                <Table withTableBorder horizontalSpacing="xl">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>NO</Table.Th>
                      <Table.Th>{th}</Table.Th>
                      <Table.Th ta={"center"}>SUARA TERKUNCI</Table.Th>
                      <Table.Th ta={"center"}>MAKSIMAL SUARA TERFILTER</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {isData.map((v: any, i: any) => (
                      <Table.Tr key={i}>
                        <Table.Td>{i + 1}</Table.Td>
                        <Table.Td>{v.name}</Table.Td>
                        <Table.Td ta={"center"}>{v.value}</Table.Td>
                        <Table.Td ta={"center"}>{v.valueFilteredMax}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

