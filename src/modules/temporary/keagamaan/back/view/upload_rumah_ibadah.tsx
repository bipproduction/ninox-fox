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
import { isModalAgama } from "../val/val_keagamaan"
import ModalUploadAgama from "../component/modal_agama"

export default function ViewUploadRumahIbadah() {
    const [json, setJson] = useState<any[]>([])
    const [openModal, setOpenModal] = useAtom(isModalAgama)
    const [isLoading, setLoading] = useState(false)

    // fungsi load data csv
    async function onLoad(data: any) {
        if (data.length > 0) {
            // jika data yg diupload ada datanya (length>0)
            if (('id' in data[0]) &&
                ('idProvinsi' in data[0]) &&
                ('idKabkot' in data[0]) &&
                ('idKecamatan' in data[0]) &&
                ('Provinsi' in data[0]) &&
                ('Kabkot' in data[0]) &&
                ('Kecamatan' in data[0]) &&
                ('Masjid' in data[0]) &&
                ('GerejaKhatolik' in data[0]) &&
                ('GerejaProtestan' in data[0]) &&
                ('Pura' in data[0]) &&
                ('Wihara' in data[0]) &&
                ('Kelenteng' in data[0])) {
                // jika format csv benar, maka variable json di isi dengan data csv
                setJson(data as any)
            } else {
                // jika format salah, makan variable json di set kosong daan tampil alert
                setJson([])
                toast('Format CSV salah', { theme: 'dark' })
            }
        } else {
            // jika tidak ada datanya, maka variable json di set kosong, dan tampil alert
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
                    <Text fw={"bold"} c={"white"} mb={20}>UPLOAD DATA JUMLAH RUMAH IBADAH</Text>
                    <Dropzone
                        loading={isLoading}
                        style={{
                            border: "1px dashed",
                            color: "white",
                            borderRadius: 10,
                            cursor: "pointer"
                        }}
                        onDrop={async (files: any) => {
                            setLoading(true)
                            const csv_file = Buffer.from(await files[0].arrayBuffer()).toString()
                            const { data } = papa.parse(csv_file, { header: true, })
                            onLoad(data)
                            setLoading(false)
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
                                                withRowBorders={false}
                                                horizontalSpacing="xl"
                                            >
                                                <Table.Thead>
                                                    <Table.Tr
                                                        style={{
                                                            borderBottom: "1px solid #CED4D9",
                                                        }}
                                                    >
                                                        <Table.Th>ID</Table.Th>
                                                        <Table.Th>Provinsi</Table.Th>
                                                        <Table.Th>Kabupaten/Kota</Table.Th>
                                                        <Table.Th>Kecamatan</Table.Th>
                                                        <Table.Th>Masjid</Table.Th>
                                                        <Table.Th>Gereja Khatolik</Table.Th>
                                                        <Table.Th>Gereja Protestan</Table.Th>
                                                        <Table.Th>Pura</Table.Th>
                                                        <Table.Th>Wihara</Table.Th>
                                                        <Table.Th>Kelenteng</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    {json.map(home =>
                                                        <Table.Tr key={home.id}>
                                                            <Table.Td>{home.id}</Table.Td>
                                                            <Table.Td>{home.Provinsi}</Table.Td>
                                                            <Table.Td>{home.Kabkot}</Table.Td>
                                                            <Table.Td>{home.Kecamatan}</Table.Td>
                                                            <Table.Td>{home.Masjid}</Table.Td>
                                                            <Table.Td>{home.GerejaKhatolik}</Table.Td>
                                                            <Table.Td>{home.GerejaProtestan}</Table.Td>
                                                            <Table.Td>{home.Pura}</Table.Td>
                                                            <Table.Td>{home.Wihara}</Table.Td>
                                                            <Table.Td>{home.Kelenteng}</Table.Td>
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
                <ModalUploadAgama kategori={"rumah ibadah"} data={json} onSuccess={(val) => {
                    setJson([])
                }} />
            </Modal>
        </>
    );
}