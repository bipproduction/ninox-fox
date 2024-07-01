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
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { isModalSwot } from "../val/val_swot";
import ModalDelSwot from "./modal_del_swot";
import { useEffect, useState } from "react";
import ComponentTable from "./component_table";
import funGetAllSwot from "../fun/fun_get_all_swot";
import { IoSearchSharp } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";

/**
 * Fungsi untuk menampilkan view table swot.
 * @returns {component} table swot.
 */

export default function TableSwot({ title, data, searchParam }: { title: any, data: any, searchParam: any }) {
  const [openModal, setOpenModal] = useAtom(isModalSwot);
  const router = useRouter();
  const [dataDelete, setDataDelete] = useState(Number)
  const [isSearch, setSearch] = useState("")
  const [isSort, setSort] = useState("createBaru")
  const [isData, setData] = useState(data)
  const [isDataCandidate, setDataCandidate] = useState()

  async function onLoad() {
    const dataDB = await funGetAllSwot({ find: searchParam, search: isSearch, order: isSort })
    setData(dataDB.data)
  }

  async function onSearch(val: any) {
    setSearch(val)
    const dataDB = await funGetAllSwot({ find: searchParam, search: val, order: isSort })
    setData(dataDB.data)
  }

  async function onSortir(val: any) {
    setSort(val)
    const dataDB = await funGetAllSwot({ find: searchParam, search: isSearch, order: val })
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
            {/* <Button bg={"gray"} onClick={() => router.push("swot/add?prov=" + searchParams.get('prov') + '&city=' + searchParams.get('city'))}>
              TAMBAH SWOT
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
                  withRowBorders={false}
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
                      <Table.Th>Created</Table.Th>
                      <Table.Th>Updated</Table.Th>
                      <Table.Th w={180}>
                        <Center>Aksi</Center>
                      </Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  {isData.map((v: any, i: any) => (
                    <ComponentTable v={v} i={i} key={i} onClick={(val) => {
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
        <ModalDelSwot candidate={isDataCandidate} id={dataDelete} onSuccess={() => onLoad()} />
      </Modal>
    </>
  );
}