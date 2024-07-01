'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
   ActionIcon,
   Badge,
   Box,
   Center,
   Collapse,
   Group,
   Stack,
   Table,
   Text,
} from "@mantine/core";
import { CiRead, CiUnread } from "react-icons/ci";
import { MdOutlineQuestionAnswer } from "react-icons/md";

export default function ComponentTableRequest({ v, i, page }: { v: any; i: any, page: any }) {
   const open = useState(false);
   const router = useRouter();
   page = page * 25 - 24


   return (
      <>
         <Table.Tbody key={i}>
            <Table.Tr>
               <Table.Td>{page + i}</Table.Td>
               <Table.Td>{v.date}</Table.Td>
               <Table.Td>{v.name}</Table.Td>
               <Table.Td>
                  <Center>
                     <Stack>
                        <Group>
                           <ActionIcon
                              variant="transparent"
                              color="rgba(5, 128, 23, 1)"
                              size="xl"
                              aria-label="Edit"
                              onClick={() => open[1](!open[0])}
                           >
                              {open[0] ? <CiRead size={20} /> : <CiUnread size={20} />}
                           </ActionIcon>
                        </Group>
                     </Stack>
                     <ActionIcon
                        variant="transparent"
                        color="rgba(5, 128, 23, 1)"
                        size="xl"
                        aria-label="Edit"
                        onClick={() => {
                           if (v.status == 1) {
                              router.push("/dashboard/ml-ai/edit/" + v.idMlAi)
                           } else {
                              router.push("/dashboard/ml-ai/add?req=" + v.id)
                           }

                        }}
                     >
                        <MdOutlineQuestionAnswer size={20} />
                     </ActionIcon>
                  </Center>
               </Table.Td>
            </Table.Tr>
            <Table.Tr>
               <Table.Td colSpan={5}>
                  <Collapse
                     in={open[0]}
                     transitionDuration={500}
                     transitionTimingFunction="linear"
                  >
                     <Box
                        style={{
                           backgroundColor: "gray",
                           padding: 20,
                           borderRadius: 10,
                        }}
                     >
                        <Text c={"white"} fw={"bold"} fz={20} mb={10}>
                           Request
                        </Text>
                        <Stack c={'white'}>
                           <Box dangerouslySetInnerHTML={{ __html: v.request }} />
                        </Stack>
                        {
                           (v.status == 1)
                              ? <Box pt={20}>
                                 <Box pl={20} pb={10} pt={10} bg={'#CED4D9'} style={{ borderRadius: 10 }}>
                                    {/* <Stack c={'white'}> */}
                                    <Text fw={"bold"} fz={20}>
                                       Response
                                    </Text>
                                    <Box m={0} dangerouslySetInnerHTML={{ __html: v.response }} />
                                    {/* </Stack> */}
                                 </Box>
                              </Box>
                              : <></>
                        }
                     </Box>
                  </Collapse>
               </Table.Td>
            </Table.Tr>
         </Table.Tbody>
      </>
   );
}
