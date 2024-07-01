"use client"
import { Box, ScrollArea, Table, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 1,
    kabupaten: "BADUNG",
    Confidence: 232,
    Supportive: 21,
    Positive: 311,
    Undecided: 32,
    Unsupportive: 21,
    Negative: 3232,
    Disapproval: 211,
  },
  {
    id: 2,
    kabupaten: "DENPASAR",
    Confidence: 232,
    Supportive: 21,
    Positive: 311,
    Undecided: 32,
    Unsupportive: 21,
    Negative: 3232,
    Disapproval: 211,
  },
  {
    id: 3,
    kabupaten: "BULELENG",
    Confidence: 232,
    Supportive: 21,
    Positive: 311,
    Undecided: 32,
    Unsupportive: 21,
    Negative: 3232,
    Disapproval: 211,
  },
  {
    id: 4,
    kabupaten: "GIANYAR",
    Confidence: 232,
    Supportive: 21,
    Positive: 311,
    Undecided: 32,
    Unsupportive: 21,
    Negative: 3232,
    Disapproval: 211,
  },
  {
    id: 5,
    kabupaten: "TABANAN",
    Confidence: 232,
    Supportive: 21,
    Positive: 311,
    Undecided: 32,
    Unsupportive: 21,
    Negative: 3232,
    Disapproval: 211,
  },
];
/**
 * Fungsi untuk mendapatkan nilai dari table.
 * @returns  Hasil menampilkan tabel beserta valuenya.
 */
export default function TableData({ title, data, th }: { title: string, data: any, th: any }) {
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
                <Table withTableBorder horizontalSpacing="sm" verticalSpacing={'xs'} withColumnBorders>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th rowSpan={2} ta={"center"}>NO</Table.Th>
                      <Table.Th w={250} rowSpan={2} ta={"center"}>{th}</Table.Th>
                      <Table.Th colSpan={2} ta={"center"}>POTENSI MENDUKUNG</Table.Th>
                      <Table.Th colSpan={2} ta={"center"}>MEMPERTIMBANGKAN</Table.Th>
                      <Table.Th colSpan={2} ta={"center"}>TIDAK TAHU</Table.Th>
                      <Table.Th colSpan={2} ta={"center"}>POTENSI TIDAK MENDUKUNG</Table.Th>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th ta={"center"}>fix</Table.Th>
                      <Table.Th ta={"center"}>berubah</Table.Th>
                      <Table.Th ta={"center"}>fix</Table.Th>
                      <Table.Th ta={"center"}>berubah</Table.Th>
                      <Table.Th ta={"center"}>fix</Table.Th>
                      <Table.Th ta={"center"}>berubah</Table.Th>
                      <Table.Th ta={"center"}>fix</Table.Th>
                      <Table.Th ta={"center"}>berubah</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {isData.map((v: any, i: any) => (
                      <Table.Tr key={i}>
                        <Table.Td>{i + 1}</Table.Td>
                        <Table.Td w={250}>{v.name}</Table.Td>
                        <Table.Td ta={"right"}>{v.confidence}</Table.Td>
                        <Table.Td ta={"right"}>{v.supportive}</Table.Td>
                        <Table.Td ta={"right"}>{v.positive}</Table.Td>
                        <Table.Td ta={"right"}>{v.undecided}</Table.Td>
                        <Table.Td ta={"right"}>{v.unsupportive}</Table.Td>
                        <Table.Td ta={"right"}>{v.uncomfortable}</Table.Td>
                        <Table.Td ta={"right"}>{v.negative}</Table.Td>
                        <Table.Td ta={"right"}>{v.dissapproval}</Table.Td>
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
