'use client'
import { Avatar, Box, Group, Image, ScrollArea, Table } from "@mantine/core";
import _ from "lodash";
import React from "react";

/**
 * Fungsi menampilkan halaman table data pairing.
 * @returns  Hasil dari table data pairing untuk menampilkan data table
 */
export default function TableDataPairing({ data, th }: { data: any, th: any }) {
  return (
    <>
      <Box
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: "5px",
        }}
      >
        <ScrollArea>
          <Table withTableBorder horizontalSpacing="sm" verticalSpacing={'xs'} withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                {/* <Table.Th rowSpan={2} ta={"center"}>KANDIDAT 1</Table.Th>
                <Table.Th rowSpan={2} ta={"center"}>KANDIDAT 2</Table.Th> */}
                <Table.Th rowSpan={2} ta={"center"}>NO</Table.Th>
                <Table.Th rowSpan={2} ta={"center"}>{th}</Table.Th>
                <Table.Th rowSpan={2} ta={"center"}>RATE</Table.Th>
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
              {data.map((v: any, i: any) => {
                v.rate = v.rate.toString()
                return (
                  <Table.Tr key={i}>
                    {/* <Table.Td>{v.can1}</Table.Td>
                    <Table.Td>{v.can2}</Table.Td> */}
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>{v.area}</Table.Td>
                    <Table.Td>{v.rate}%</Table.Td>
                    <Table.Td ta={"right"}>{v.confidence}</Table.Td>
                    <Table.Td ta={"right"}>{v.supportive}</Table.Td>
                    <Table.Td ta={"right"}>{v.positive}</Table.Td>
                    <Table.Td ta={"right"}>{v.undecided}</Table.Td>
                    <Table.Td ta={"right"}>{v.unsupportive}</Table.Td>
                    <Table.Td ta={"right"}>{v.uncomfortable}</Table.Td>
                    <Table.Td ta={"right"}>{v.negative}</Table.Td>
                    <Table.Td ta={"right"}>{v.dissapproval}</Table.Td>
                  </Table.Tr>
                )
              })}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Box>
    </>
  );
}
