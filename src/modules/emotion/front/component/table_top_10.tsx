
import { WARNA } from '@/modules/_global/fun/WARNA';
import { Box, Group, Pagination, ScrollArea, Table } from '@mantine/core';
import React from 'react';
import TopPairingCandidate from './top_pairing_candidate';

const top10 = [
  {
    id: 1,
    provinsi: "Denpasar",
    locked: "2.890.900",
    filtered: "1.891.891",
    confidence: "3.908.178",
    supportive: "4.890.901",
    positive: "1.221.333",
    negative: "2.009.009",
  },
  {
    id: 2,
    provinsi: "Tabanan",
    locked: "2.890.900",
    filtered: "1.891.891",
    confidence: "3.908.178",
    supportive: "4.890.901",
    positive: "1.221.333",
    negative: "2.009.009",
  },
  {
    id: 3,
    provinsi: "Gianyar",
    locked: "2.890.900",
    filtered: "1.891.891",
    confidence: "3.908.178",
    supportive: "4.890.901",
    positive: "1.221.333",
    negative: "2.009.009",
  },
  {
    id: 4,
    provinsi: "Klungkung",
    locked: "2.890.900",
    filtered: "1.891.891",
    confidence: "3.908.178",
    supportive: "4.890.901",
    positive: "1.221.333",
    negative: "2.009.009",
  },
  {
    id: 5,
    provinsi: "Badung",
    locked: "2.890.900",
    filtered: "1.891.891",
    confidence: "3.908.178",
    supportive: "4.890.901",
    positive: "1.221.333",
    negative: "2.009.009",
  },
  {
    id: 6,
    provinsi: "Karangasem",
    locked: "2.890.900",
    filtered: "1.891.891",
    confidence: "3.908.178",
    supportive: "4.890.901",
    positive: "1.221.333",
    negative: "2.009.009",
  },
  {
    id: 7,
    provinsi: "Bangli",
    locked: "2.890.900",
    filtered: "1.891.891",
    confidence: "3.908.178",
    supportive: "4.890.901",
    positive: "1.221.333",
    negative: "2.009.009",
  },
  {
    id: 8,
    provinsi: "Buleleng",
    locked: "2.890.900",
    filtered: "1.891.891",
    confidence: "3.908.178",
    supportive: "4.890.901",
    positive: "1.221.333",
    negative: "2.009.009",
  },
  {
    id: 9,
    provinsi: "Jembrana",
    locked: "2.890.900",
    filtered: "1.891.891",
    confidence: "3.908.178",
    supportive: "4.890.901",
    positive: "1.221.333",
    negative: "2.009.009",
  },
]


/**
 * Fungsi untuk menampilkan top 10.
 * @returns {component} menampilakn top 10.
 */
export default function TableTop10() {

  return (
    <>
      <Box style={{
        // backgroundColor: "#101010",
        background: "rgba(0,0,0,0.3)",
        padding: 20,
        borderRadius: 10
      }}>
        <ScrollArea>
          <Table withRowBorders={false}>
            <Table.Thead c={"white"}>
              <Table.Tr >
                <Table.Th>NO</Table.Th>
                <Table.Th>KABUPATEN / KOTA</Table.Th>
                <Table.Th>LOCKED AUDIENCE</Table.Th>
                <Table.Th>FILTERED AUDIENCE</Table.Th>
                <Table.Th>CONFIDENCE</Table.Th>
                <Table.Th>SUPPORTIVE</Table.Th>
                <Table.Th>POSITIVE</Table.Th>
                <Table.Th>NEGATIVE</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody c={"white"} >
              {top10.map((v, i) => (
                <Table.Tr key={i}>
                  <Table.Td>{i + 1}</Table.Td>
                  <Table.Td>{v.provinsi}</Table.Td>
                  <Table.Td c={"white"}>{v.locked}</Table.Td>
                  <Table.Td c={"white"}>{v.filtered}</Table.Td>
                  <Table.Td c={WARNA.hijau}>{v.confidence}</Table.Td>
                  <Table.Td c={"#98CC6F"}>{v.supportive}</Table.Td>
                  <Table.Td c={"#C6E2B7"}>{v.positive}</Table.Td>
                  <Table.Td c={WARNA.merah}>{v.negative}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Box>
      <Box pt={20}>
        <Group justify='flex-end'>
          <Pagination total={10} color="#A0ADA6" />
        </Group>
      </Box>



    </>
  );
}

