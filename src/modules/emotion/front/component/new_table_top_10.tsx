import { Box, Group, Pagination, ScrollArea, Table } from '@mantine/core';
import _, { ceil } from 'lodash';
import React, { useState } from 'react';

export default function NewTableTop10({ emotion, tingkat, locked }: { emotion: any, tingkat: any, locked: any }) {
   const [isData, setData] = useState(_.slice(emotion, 0, 10))
   const [totalPage, setTotalPage] = useState(ceil(emotion.length / 10))
   const [valPage, setPage] = useState(1)
   let noAwal = valPage * 10 - 9;

   async function onPaging(p: any) {
      const start = (10 * p) - 10;
      const end = start + 10;
      const dataNow = _.slice(emotion, start, end)
      setPage(p)
      setData(dataNow)
   }
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
                        <Table.Th w={250}>{(tingkat == 2) ? 'KECAMATAN' : 'KABUPATEN / KOTA'}</Table.Th>
                        <Table.Th ta={'end'}> SUARA TERKUNCI </Table.Th>
                        <Table.Th ta={'end'}> SUARA TERFILTER </Table.Th>
                        <Table.Th ta={'end'} c={'green'}> POTENSI MENDUKUNG</Table.Th>
                        <Table.Th ta={'end'} c={'yellow'}> MEMPERTIMBANGKAN </Table.Th>
                        <Table.Th ta={'end'} c={'gray'} > TIDAK TAHU </Table.Th>
                        <Table.Th ta={'end'} c={'red'}> POTENSI TIDAK MENDUKUNG </Table.Th>
                     </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody c={"white"} >
                     {isData.map((v: any, i: any) => (
                        <Table.Tr key={i}>
                           <Table.Td align='center'>{noAwal++}</Table.Td>
                           <Table.Td>{v.name}</Table.Td>
                           <Table.Td align='right' c={"white"}>{Intl.NumberFormat("id-ID").format(Number(locked.filter((i: any) => i.idArea === v.idArea)[0].value))}</Table.Td>
                           <Table.Td align='right' c={"white"}>{Intl.NumberFormat("id-ID").format(Number(v.filtered))}</Table.Td>
                           <Table.Td align='right' c={'green'} >{Intl.NumberFormat("id-ID").format(Number(v.mendukung))}</Table.Td>
                           <Table.Td align='right' c={'yellow'}>{Intl.NumberFormat("id-ID").format(Number(v.mempertimbangkan))}</Table.Td>
                           <Table.Td align='right' c={'gray'} >{Intl.NumberFormat("id-ID").format(Number(v.tidaktahu))}</Table.Td>
                           <Table.Td align='right' c={'red'}>{Intl.NumberFormat("id-ID").format(Number(v.tidakmendukung))}</Table.Td>
                        </Table.Tr>
                     ))}
                  </Table.Tbody>
               </Table>
            </ScrollArea>
         </Box>
         <Box pt={20}>
            <Group justify='flex-end'>
               <Pagination
                  total={totalPage}
                  color="rgba(70, 5, 120, 1)"
                  value={valPage}
                  onChange={(val) => onPaging(val)}
               />
            </Group>
         </Box>
      </>
   );
}

