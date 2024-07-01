'use client'
import { ButtonBack, MasterKabGetByProvince } from "@/modules/_global"
import { Avatar, Box, Button, Center, Group, Modal, Paper, Select, SimpleGrid, Stack, Text, TextInput } from "@mantine/core"
import { useAtom } from "jotai"
import { isModalCandidate } from "../val/isModalCandidate"
import ModalAddCandidate from "../component/modal_add_candidate"
import { useRef, useState } from "react"
import toast from "react-simple-toasts"
import { useRouter, useSearchParams } from "next/navigation"
import _ from "lodash"
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"

/**
 * Fungsi untuk menampilkan view add candidate.
 * @returns {component} view add candidate.
 */

export default function AddCandidate({ params, provinsi, kabupaten, }: { params: any, provinsi: any, kabupaten: any }) {
    const [openModal, setOpenModal] = useAtom(isModalCandidate)
    const [img, setIMG] = useState<any | null>()
    const [imgForm, setImgForm] = useState<FormData>()
    const router = useRouter();
    const [dataProvinsi, setDataProvinsi] = useState(provinsi)
    const [dataKabupaten, setDatakabupaten] = useState<any>(kabupaten)
    const [isProvinsi, setProvinsi] = useState<any>(params.idProvinsi || null)
    const [isKabupaten, setKabupaten] = useState<any>(params.idKabkot || null)

    async function onKabupaten({ idProv }: { idProv: any }) {
        setProvinsi(idProv)
        setKabupaten(null)
        const dataKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
        setDatakabupaten(dataKab)
    }

    const query = useSearchParams()
    const openRef = useRef<() => void>(null);
    const [body, setBody] = useState({
        name: "",
        img: "",
        idProvinsi: isProvinsi,
        idKabkot: isKabupaten,
        // tingkat: (query.get('city') == "null" || query.get('city') == "" || _.isNull(query.get('city'))) ? 1 : 2
        tingkat: params.tingkat
    });

    function onConfirmation() {
        if (body.name === "" || body.idProvinsi==null || body.idProvinsi==0)
            return toast("Form cannot be empty", { theme: "dark" });
        setOpenModal(true)
    }


    return (
        <>
            <ButtonBack />
            <Stack mt={30}>
                <Text fw={"bold"}>TAMBAH KANDIDAT</Text>
            </Stack>
            <Box pt={30}>
                <Paper shadow="xs" p="xl" bg={"#f1f1f1"}>
                    <Stack mt={30}>
                        <Center>
                            <Avatar
                                src={img}
                                size={130}
                                radius={100}
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
                                <Select
                                    placeholder="Pilih Provinsi"
                                    data={dataProvinsi.map((pro: any) => ({
                                        value: String(pro.id),
                                        label: pro.name
                                    }))}
                                    required
                                    label={"Provinsi"}
                                    value={isProvinsi == null ? null : String(isProvinsi)}
                                    onChange={(val) => (
                                        onKabupaten({ idProv: val }),
                                        setBody({
                                            ...body,
                                            idProvinsi: (val == null) ? null : Number(val),
                                            idKabkot: null,
                                            tingkat: 1
                                        })
                                    )}
                                    searchable

                                />
                                <Select
                                    placeholder="Kabupaten/Kota"
                                    data={dataKabupaten.map((kab: any) => ({
                                        value: String(kab.id),
                                        label: kab.name
                                    }))}
                                    searchable
                                    value={isKabupaten == null ? null : String(isKabupaten)}
                                    onChange={(val) => (
                                        setKabupaten(val),
                                        setBody({
                                            ...body,
                                            idKabkot: (val == null) ? null : Number(val),
                                            tingkat: (val == null) ? 1 : 2
                                        })
                                    )}
                                    label={"Kabupaten"}

                                />
                            </SimpleGrid>
                            <TextInput
                                placeholder="Nama Kandidat" withAsterisk label="Nama"
                                value={body.name}
                                onChange={(val) => {

                                    setBody({
                                        ...body,
                                        name: val.target.value
                                    })
                                }}
                            />
                            <Group justify="flex-end">
                                <Button bg={"gray"} w={150} mt={30} onClick={() => onConfirmation()}>SIMPAN</Button>
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
                <ModalAddCandidate data={body} img={imgForm} onSuccess={() => {
                    setIMG(null)
                    // setKabupaten(null)
                    // setProvinsi(null)
                    setBody({
                        ...body,
                        name: "",
                        img: "",
                        idProvinsi: null,
                        idKabkot: null,
                        tingkat: 1
                    })
                }} />
            </Modal>
        </>
    )
}