'use client'
import { ButtonBack } from "@/modules/_global"
import { Avatar, Box, Button, Center, Group, Modal, Paper, Select, SimpleGrid, Stack, Text, TextInput } from "@mantine/core"
import { useAtom } from "jotai"
import { isModalCandidate } from "../val/isModalCandidate"
import ModalEditCandidate from "../component/modal_edit_candidate"
import { useRef, useState } from "react"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import toast from "react-simple-toasts"
import _ from "lodash"
import { useRouter } from "next/navigation"

/**
 * Fungsi untuk menampilkan view edit candidate.
 * @param {string} data - Data get one dari database.
 * @returns {component} view edit candidate.
 */

export default function EditCandidate({ data, params, provinsi, kabupaten }: { data: any, params: any, provinsi: any, kabupaten: any }) {
    const openRef = useRef<() => void>(null);
    const [openModal, setOpenModal] = useAtom(isModalCandidate)
    const [imgForm, setImgForm] = useState<FormData>()
    const [img, setIMG] = useState<any | null>(`/img/candidate/${data.img}`)
    const [dataEdit, setDataEdit] = useState({
        id: data.id,
        name: data.name,
    })

    const router = useRouter();
    const [dataProvinsi, setDataProvinsi] = useState(data.idProvinsi)
    const [dataKabupaten, setDatakabupaten] = useState<any>(kabupaten)
    const [isProvinsi, setProvinsi] = useState<any>(data.idProvinsi || null)
    const [isKabupaten, setKabupaten] = useState<any>(data.idKabkot || null)
    const [isData, setIsData] = useState(data)

    function onConfirmation() {
        if (dataEdit.name === "")
            return toast("Nama tidak boleh kosong", { theme: "dark" });
        setOpenModal(true)
    }

    return (
        <>
            <ButtonBack />
            <Stack mt={30}>
                <Text fw={"bold"}>EDIT KANDIDAT</Text>
            </Stack>
            <Box pt={30}>
                <Paper shadow="xs" p="xl" bg={"#f1f1f1"}>
                    <Stack mt={30}>
                        <Center>
                            <Avatar
                                size={130}
                                radius={100}
                                src={img}
                                alt="kandidat"
                                color="dark"
                            />
                        </Center>
                        <Group justify="center">
                            <Center pt={10}>
                                <Dropzone
                                    openRef={openRef}
                                    onDrop={async (files) => {
                                        if (!files || _.isEmpty(files))
                                            return toast("tidak ada yang dipilih", { theme: 'dark' });
                                        const fd = new FormData();
                                        fd.append("file", files[0]);
                                        setImgForm(fd)
                                        const buffer = URL.createObjectURL(new Blob([new Uint8Array(await files[0].arrayBuffer())]))
                                        setIMG(buffer)
                                    }}
                                    onReject={(files) => {
                                        return toast("file tidak didukung, atau terlalu besar", { theme: 'dark' });
                                    }}
                                    maxSize={3 * 1024 ** 2}
                                    accept={IMAGE_MIME_TYPE}
                                    activateOnClick={false}
                                    styles={{ inner: { pointerEvents: "all" } }}
                                >
                                    <Group justify="center">
                                        <Button
                                            color="gray.5"
                                            radius="xl"
                                            onClick={() => openRef.current?.()}
                                        >
                                            UPLOAD
                                        </Button>
                                    </Group>
                                </Dropzone>
                            </Center>
                        </Group>
                        <Box pt={40}>
                            <SimpleGrid
                                cols={{ base: 1, sm: 2, lg: 2 }}
                                spacing={{ base: 10, sm: 'xl' }}
                                verticalSpacing={{ base: 'md', sm: 'xl' }}
                            >
                                <TextInput
                                    value={isData.AreaProvinsi}
                                    disabled
                                />
                                <TextInput
                                    value={isData.AreaKabkot}
                                    disabled
                                />
                            </SimpleGrid>
                            <TextInput
                                mt={20}
                                placeholder="Nama Kandidat"
                                value={dataEdit.name}
                                onChange={(val) => {
                                    setDataEdit({
                                        ...dataEdit,
                                        name: val.target.value
                                    })
                                }}
                            />
                            <Group justify="flex-end">
                                <Button bg={"gray"} mt={30} onClick={() => onConfirmation()}>SIMPAN</Button>
                            </Group>
                        </Box>
                    </Stack>
                </Paper>
            </Box>

            <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
                centered
                withCloseButton={false}
                closeOnClickOutside={false}
            >
                <ModalEditCandidate provinsi={dataProvinsi} data={dataEdit} img={imgForm} />
            </Modal>
        </>
    )
}