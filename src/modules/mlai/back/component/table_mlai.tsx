"use client";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Collapse,
  Group,
  Modal,
  Pagination,
  ScrollArea,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { isModalMlAi } from "../val/val_mlai";
import ModalDelMlAi from "./modal_del_mlai";
import { useEffect, useState } from "react";
import ComponentTable from "./component_table";
import { funGetAllMlAi } from "../..";

/**
 * Fungsi untuk menampilkan table ml ai.
 * @returns {component} table & pagination ml ai.
 */

export default function TableMlAi({ title, data, searchParam, nPage }: { title: any, data: any, searchParam: any, nPage: any }) {
  const [openModal, setOpenModal] = useAtom(isModalMlAi);
  const router = useRouter();
  const [dataDelete, setDataDelete] = useState(Number)

  const [isData, setData] = useState(data)
  const [isDataCandidate, setDataCandidate] = useState()
  const searchParams = useSearchParams()
  const [isNPage, setNPage] = useState(nPage)
  const [isChoosePage, setChoosePage] = useState(1)

  async function onLoad(val: any) {
    setChoosePage(val)
    const dataDB = await funGetAllMlAi({ find: searchParam, page: val })
    setData(dataDB.data)
  }

  useEffect(() => {
    setData(data)
    setNPage(nPage)
  }, [data, nPage])


  return (
    <>
      <Box mt={30}>
        <Box
          style={{
            backgroundColor: "gray",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Group justify="space-between" gap="lg">
            <Text fw={"bold"} c={"white"}>
              {title}
            </Text>
            {/* <Button bg={"gray"} onClick={() => router.push("ml-ai/add?prov=" + searchParams.get('prov') + '&city=' + searchParams.get('city'))}>
              TAMBAH ML-AI
            </Button> */}
          </Group>
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
                      <Table.Th>Kandidat</Table.Th>
                      <Table.Th>Tanggal</Table.Th>
                      <Table.Th>Jam</Table.Th>
                      <Table.Th>
                        <Center>Aksi</Center>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  {isData.map((v: any, i: any) => (
                    <ComponentTable v={v} i={i} key={i} page={isChoosePage} onClick={(val) => {
                      setDataDelete(val)
                      setDataCandidate(v.idCandidate)
                      setOpenModal(true)
                    }} />
                  ))}
                </Table>
              </ScrollArea>
              <Group justify="right" mt={20}>
                <Pagination
                  value={isChoosePage}
                  onChange={(val) => {
                    onLoad(val)
                  }}
                  total={isNPage}
                />
              </Group>
            </Box>
          </Box>
        </Box>
      </Box>

      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalDelMlAi candidate={isDataCandidate} id={dataDelete} onSuccess={() => onLoad(isChoosePage)} />
      </Modal>
    </>
  );
}


