import { Box, ScrollArea, Table } from '@mantine/core';
import React from 'react';

const isData = [
  {
    id: 1,
    kabkot: "Abiansemal",
    suaraK: "0",
    suaraL: "0",
    potensi: '0',
    pertimbangan: "0",
    tidakTau: "0",
    tidakMendukung: '0'
  },
  {
    id: 2,
    kabkot: "Kuta",
    suaraK: "0",
    suaraL: "0",
    potensi: '0',
    pertimbangan: "0",
    tidakTau: "0",
    tidakMendukung: '0'
  },
  {
    id: 3,
    kabkot: "Kuta Selatan",
    suaraK: "0",
    suaraL: "0",
    potensi: '0',
    pertimbangan: "0",
    tidakTau: "0",
    tidakMendukung: '0'
  },
  {
    id: 4,
    kabkot: "Kuta Utara",
    suaraK: "0",
    suaraL: "0",
    potensi: '0',
    pertimbangan: "0",
    tidakTau: "0",
    tidakMendukung: '0'
  },
  {
    id: 5,
    kabkot: "Mengwi",
    suaraK: "0",
    suaraL: "0",
    potensi: '0',
    pertimbangan: "0",
    tidakTau: "0",
    tidakMendukung: '0'
  },
  {
    id: 1,
    kabkot: "Petang",
    suaraK: "0",
    suaraL: "0",
    potensi: '0',
    pertimbangan: "0",
    tidakTau: "0",
    tidakMendukung: '0'
  }
]

export default function NewTableTop10Dummy() {
  return (
    <>
      <Box style={{
        background: "rgba(0,0,0,0.3)",
        padding: 20,
        borderRadius: 10
      }}>
        <ScrollArea>
          <Table withRowBorders={false}>
            <Table.Thead c={"white"}>
              <Table.Tr >
                <Table.Th>NO</Table.Th>
                <Table.Th w={250}>KECAMATAN</Table.Th>
                <Table.Th ta={'center'}> SUARA TERKUNCI </Table.Th>
                <Table.Th ta={'center'}> SUARA TERFILTER </Table.Th>
                <Table.Th ta={'center'} c={'green'}> POTENSI MENDUKUNG</Table.Th>
                <Table.Th ta={'center'} c={'yellow'}> MEMPERTIMBANGKAN </Table.Th>
                <Table.Th ta={'center'} c={'gray'} > TIDAK TAHU </Table.Th>
                <Table.Th ta={'center'} c={'red'}> POTENSI TIDAK MENDUKUNG </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody c={"white"} >
              {isData.map((v: any, i: any) => (
                <Table.Tr key={i}>
                  <Table.Td align='center'>{i+ 1}</Table.Td>
                  <Table.Td>{v.kabkot}</Table.Td>
                  <Table.Td align='right' >{Intl.NumberFormat("id-ID").format(Number(v.suaraK))}</Table.Td>
                  <Table.Td align='right' >{Intl.NumberFormat("id-ID").format(Number(v.suaraL))}</Table.Td>
                  <Table.Td align='right' c={'green'} >{Intl.NumberFormat("id-ID").format(Number(v.potensi))}</Table.Td>
                  <Table.Td align='right' c={'yellow'}>{Intl.NumberFormat("id-ID").format(Number(v.pertimbangan))}</Table.Td>
                  <Table.Td align='right' c={'gray'} >{Intl.NumberFormat("id-ID").format(Number(v.tidakTau))}</Table.Td>
                  <Table.Td align='right' c={'red'}>{Intl.NumberFormat("id-ID").format(Number(v.tidakMendukung))}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Box>
    </>
  );
}

