'use client'
import { ButtonBack } from "@/modules/_global"
import { Box, Button, Group, Modal, ScrollArea, Stack, Table, Text, rem } from "@mantine/core"
import { Dropzone } from "@mantine/dropzone"
import { useState } from "react"
import { AiOutlineUpload } from "react-icons/ai"
import { MdCancelPresentation } from "react-icons/md"
import { GrDocumentCsv } from 'react-icons/gr';
import toast from "react-simple-toasts"
import papa from 'papaparse'
import { useAtom } from "jotai"
import { isModalPairing } from "../val/val_modal_pairing"
import ModalUploadPairing from "../components/modal/upload_modal"

export default function ViewUploadPairing() {
    const [json, setJson] = useState<any[]>([])
    const [openModal, setOpenModal] = useAtom(isModalPairing)


    async function onLoad(data: any) {
        if (data.length > 0) {
            if (
                ('id' in data[0]) &&
                ('idCandidate1' in data[0]) &&
                ('idCandidate2' in data[0]) &&
                ('idProvinsi' in data[0]) &&
                ('idKabkot' in data[0]) &&
                ('idKecamatan' in data[0]) &&
                ('candidate1' in data[0]) &&
                ('candidate2' in data[0]) &&
                ('provinsi' in data[0]) &&
                ('kabkot' in data[0]) &&
                ('kecamatan' in data[0]) &&
                ('date' in data[0]) &&
                ('rate' in data[0]) &&
                ('PotensiMendukungFix' in data[0]) &&
                ('PotensiMendukungBerubah' in data[0]) &&
                ('MempertimbangkanFix' in data[0]) &&
                ('MempertimbangkanBerubah' in data[0]) &&
                ('TidakTahuFix' in data[0]) &&
                ('TidakTahuBerubah' in data[0]) &&
                ('PotensiTidakMendukungFix' in data[0]) &&
                ('PotensiTidakMendukungBerubah' in data[0])
            ) {
                setJson(data as any)
            } else {
                setJson([])
                toast('Format CSV salah', { theme: 'dark' })
            }
        } else {
            setJson([])
            toast('Data Kosong', { theme: 'dark' })
        }
    }


    return (
        <>
            <Stack>
                <ButtonBack />
            </Stack>
            <Stack p={"md"}>
                <Box
                    style={{
                        backgroundColor: "gray",
                        padding: 20,
                        borderRadius: 10
                    }}
                >
                    <Text fw={"bold"} c={"white"} mb={20}>UPLOAD DATA PENILAIAN SENTIMEN PEMILIH DAN DATA PASANGAN REGIONAL</Text>
                    <Dropzone
                        style={{
                            border: "1px dashed",
                            color: "white",
                            borderRadius: 10,
                            cursor: "pointer"
                        }}
                        onDrop={async (files: any) => {
                            const csv_file = Buffer.from(await files[0].arrayBuffer()).toString()
                            const { data } = papa.parse(csv_file, { header: true, })
                            onLoad(data)
                        }}
                        onReject={(files: any) => {
                            toast("success")

                        }}
                        maxSize={3 * 1024 ** 2}
                        accept={['text/csv']}
                    >
                        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                            <Dropzone.Accept>
                                <AiOutlineUpload
                                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                    stroke={"1.5"}
                                />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <MdCancelPresentation
                                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                    stroke={"1.5"}
                                />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <GrDocumentCsv
                                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                    stroke={"1.5"}
                                />
                            </Dropzone.Idle>

                            <div>
                                <Text size="xl" inline>
                                    Seret file ke sini atau klik untuk memilih file
                                </Text>
                                <Text size="sm" inline mt={7} >
                                    Lampirkan satu file, file tidak boleh melebihi 5MB
                                </Text>
                            </div>
                        </Group>
                    </Dropzone>
                    {
                        (json.length > 0) && (
                            <>
                                <Box style={{
                                    borderRadius: 10,
                                    paddingTop: 20
                                }}>
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
                                                withColumnBorders={true}
                                                horizontalSpacing="xs"
                                            >
                                                <Table.Thead>
                                                    <Table.Tr
                                                        style={{
                                                            borderBottom: "1px solid #CED4D9",
                                                        }}
                                                    >
                                                        <Table.Th rowSpan={2} ta={"center"}>ID</Table.Th>
                                                        <Table.Th rowSpan={2} ta={"center"}>Kandidat 1</Table.Th>
                                                        <Table.Th rowSpan={2} ta={"center"}>Kandidat 2</Table.Th>
                                                        <Table.Th rowSpan={2} ta={"center"}>Provinsi</Table.Th>
                                                        <Table.Th rowSpan={2} ta={"center"}>Kabupaten/Kota</Table.Th>
                                                        <Table.Th rowSpan={2} ta={"center"}>Kecamatan</Table.Th>
                                                        <Table.Th rowSpan={2} ta={"center"}>Tanggal</Table.Th>
                                                        <Table.Th rowSpan={2} ta={"center"}>Rate</Table.Th>
                                                        <Table.Th colSpan={2} ta={"center"}>Potensi Mendukung</Table.Th>
                                                        <Table.Th colSpan={2} ta={"center"}>Mempertimbangkan</Table.Th>
                                                        <Table.Th colSpan={2} ta={"center"}>Tidak Tahu</Table.Th>
                                                        <Table.Th colSpan={2} ta={"center"}>Potensi Tidak Mendukung</Table.Th>
                                                    </Table.Tr>
                                                    <Table.Tr
                                                        style={{
                                                            borderBottom: "1px solid #CED4D9",
                                                        }}
                                                    >
                                                        <Table.Th>fix</Table.Th>
                                                        <Table.Th>berubah</Table.Th>
                                                        <Table.Th>fix</Table.Th>
                                                        <Table.Th>berubah</Table.Th>
                                                        <Table.Th>fix</Table.Th>
                                                        <Table.Th>berubah</Table.Th>
                                                        <Table.Th>fix</Table.Th>
                                                        <Table.Th>berubah</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    {json.map((home: any, i: any) =>
                                                        <Table.Tr key={i + 1}>
                                                            <Table.Td>{home.id}</Table.Td>
                                                            <Table.Td>{home.candidate1}</Table.Td>
                                                            <Table.Td>{home.candidate2}</Table.Td>
                                                            <Table.Td>{home.provinsi}</Table.Td>
                                                            <Table.Td>{home.kabkot}</Table.Td>
                                                            <Table.Td>{home.kecamatan}</Table.Td>
                                                            <Table.Td>{home.date}</Table.Td>
                                                            <Table.Td>{home.rate}</Table.Td>
                                                            <Table.Td>{home.PotensiMendukungFix}</Table.Td>
                                                            <Table.Td>{home.PotensiMendukungBerubah}</Table.Td>
                                                            <Table.Td>{home.MempertimbangkanFix}</Table.Td>
                                                            <Table.Td>{home.MempertimbangkanBerubah}</Table.Td>
                                                            <Table.Td>{home.TidakTahuFix}</Table.Td>
                                                            <Table.Td>{home.TidakTahuBerubah}</Table.Td>
                                                            <Table.Td>{home.PotensiTidakMendukungFix}</Table.Td>
                                                            <Table.Td>{home.PotensiTidakMendukungBerubah}</Table.Td>
                                                        </Table.Tr>
                                                    )}
                                                </Table.Tbody>
                                            </Table>
                                        </ScrollArea>

                                    </Box>
                                </Box>
                                <Group justify="flex-end">
                                    <Box
                                        style={{
                                            padding: 10,
                                            borderRadius: 5,
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                            position: "fixed",
                                            bottom: 30,
                                            right: 30,
                                            backgroundColor: "green",
                                            boxShadow: "2px solid gray",
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            setOpenModal(true)
                                        }}
                                    >
                                        <Group>
                                            <AiOutlineUpload size={25} color={"white"} />
                                            <Text fw={"bold"} c={"white"}>UPLOAD</Text>
                                        </Group>
                                    </Box>
                                </Group>
                            </>
                        )
                    }
                </Box>
            </Stack>

            <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
                centered
                withCloseButton={false}
                closeOnClickOutside={false}
            >
                <ModalUploadPairing data={json} onSuccess={(val) => {
                    setJson([])
                }} />
            </Modal>
        </>
    );
}