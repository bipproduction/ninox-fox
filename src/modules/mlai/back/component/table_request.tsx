'use client'
import { Box, Center, Group, Pagination, ScrollArea, Select, Table, Text } from "@mantine/core"
import ComponentTableRequest from "./component_table_request"
import { useState } from "react"
import funGetAllRequestMlai from "../fun/fun_get_all_request"

export default function TableRequest({ data, nPage }: { data: any, nPage: any }) {
   const [isData, setData] = useState(data)
   const [isNPage, setNPage] = useState(nPage)
   const [isChoosePage, setChoosePage] = useState(1)
   const [isSort, setSort] = useState("baru")

   async function onClickPage(val: any) {
      const load = await funGetAllRequestMlai({ page: val, status: 0, sort: isSort })
      setChoosePage(val)
      setData(load.data)
      setNPage(load.nPage)
   }

   async function onClickSort(val: any) {
      const load = await funGetAllRequestMlai({ page: 1, status: 0, sort: val })
      setChoosePage(1)
      setSort(val)
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
               <Box pt={10} pb={20}>
                  <Group justify="flex-end" gap={5}>
                     <Text fw={"bold"}>Urutkan:</Text>
                     <Select
                        w={400}
                        radius={5}
                        placeholder="Urutan"
                        value={isSort}
                        data={[
                           { value: "NRequestTR", label: "Banyaknya user melakukan request (tinggi-rendah)" },
                           { value: "NRequestRT", label: "Banyaknya user melakukan request (rendah-tinggi)" },
                           { value: "baru", label: "Terbaru" },
                           { value: "lama", label: "Terlama" },
                           { value: "userAZ", label: "Nama user (A-Z)" },
                           { value: "userZA", label: "Nama user (Z-A)" },
                        ]}
                        onChange={(val) => onClickSort(val)}
                     />
                  </Group>
               </Box>
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
                        <ComponentTableRequest v={v} i={i} key={i} page={isChoosePage} />
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
   )
}