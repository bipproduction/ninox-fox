"use client";
import {
  Box,
  Button,
  Center,
  Group,
  Modal,
  ScrollArea,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useAtom } from "jotai";
import { isModalStep } from "../val/val_step";
import { useRouter, useSearchParams } from "next/navigation";
import ModalDelStep from "./modal_del_step";
import ComponentTableStep from "./component_table_step";
import { useEffect, useState } from "react";
import { funGetAllStap } from "../..";
import { IoSearchSharp } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";

/**
 * Fungsi untuk menampilkan view table step.
 * @returns {component} table step.
 */

export default function TableStep({ title, data, searchParam }: { title: any, data: any, searchParam: any }) {
  const [openModal, setOpenModal] = useAtom(isModalStep);
  const router = useRouter();
  const [dataDelete, setDataDelete] = useState(Number)
  const [isData, setData] = useState(data)
  const [isSearch, setSearch] = useState("")
  const [isSort, setSort] = useState("createBaru")
  const [isDataCandidate, setDataCandidate] = useState()

  async function onLoad() {
    const dataDB = await funGetAllStap({ find: searchParam, search: isSearch, order: isSort })
    setData(dataDB.data)
  }

  async function onSearch(val: any) {
    setSearch(val)
    const dataDB = await funGetAllStap({ find: searchParam, search: val, order: isSort })
    setData(dataDB.data)
  }

  async function onSortir(val: any) {
    setSort(val)
    const dataDB = await funGetAllStap({ find: searchParam, search: isSearch, order: val })
    setData(dataDB.data)
  }

  useEffect(() => {
    setData(data)
    setSearch("")
    setSort("createBaru")
  }, [data])

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
            {/* <Button bg={"gray"} onClick={() => router.push("step/add?prov=" + searchParams.get('prov') + '&city=' + searchParams.get('city'))}>
              TAMBAH STEP
            </Button> */}
            <Group>
              <TextInput
                leftSection={
                  <IoSearchSharp />
                }
                placeholder="Cari berdasarkan konten"
                value={isSearch}
                onChange={(val) => {
                  onSearch(val.target.value)
                }}
              />
              <Select
                leftSection={
                  <BiSortAlt2 />
                }
                placeholder="Urutkan berdasarkan"
                value={isSort}
                data={[
                  { value: "createBaru", label: "Data terbaru" },
                  { value: "createLama", label: "Data terlama" },
                  { value: "updBaru", label: "Update Terbaru" },
                  { value: "updLama", label: "Update Terlama" },
                  { value: "katAZ", label: "Kategori (A-Z)" },
                  { value: "katZA", label: "Kategori (Z-A)" },
                  { value: "sentimentAZ", label: "Sentiment (A-Z)" },
                  { value: "sentimentZA", label: "Sentiment (Z-A)" },
                ]}
                onChange={(val) => {
                  onSortir(val)
                }}
              />
            </Group>
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
                  withRowBorders={true}
                  horizontalSpacing="sm"
                >
                  <Table.Thead>
                    <Table.Tr
                      style={{
                        borderBottom: "1px solid #CED4D9",
                      }}
                    >
                      <Table.Th w={50}>No</Table.Th>
                      <Table.Th w={200}>Kandidat</Table.Th>
                      <Table.Th>Kategori</Table.Th>
                      <Table.Th>Sentiment</Table.Th>
                      <Table.Th>Created</Table.Th>
                      <Table.Th>Updated</Table.Th>
                      <Table.Th>
                        <Center>Aksi</Center>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  {isData.map((v: any, i: any) => (
                    <ComponentTableStep v={v} i={i} key={i} onClick={(val) => {
                      setDataDelete(val)
                      setDataCandidate(v.idCandidate)
                      setOpenModal(true)
                    }} />
                  ))}
                </Table>
              </ScrollArea>
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
        <ModalDelStep candidate={isDataCandidate} id={dataDelete} onSuccess={() => onLoad()} />
      </Modal>
    </>
  );
}
