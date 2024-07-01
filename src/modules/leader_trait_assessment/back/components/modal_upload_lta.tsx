'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { isModalLta } from "../val/val_lta"
import funUploadLta from "../fun/upload_lta"
import { useState } from "react"
import { funLogUser } from "@/modules/user"
import { funAddNotifications, funGetAccessArea, funGetIdprovByName } from "@/modules/_global"

export default function ModalUploadLta({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalLta)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        const prov = await funGetIdprovByName({ name: data[0]?.Provinsi })
        if (prov == null) {
            setLoading(false)
            return toast("Nama provinsi salah", { theme: "dark" })
        }
        const cek = await funGetAccessArea({ provinsi: prov?.id })
        if (!cek) {
            setLoading(false)
            return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
        } else {
            await funUploadLta({ body: data })
            await funLogUser({ act: 'UPL', desc: `User mengupload data Penilaian Sifat Pemimpin`, idContent: '-', tbContent: 'lta' })
            await funAddNotifications({ kategori: 'lta', provinsiId: prov?.id })
            setLoading(false)
            toast('Success', { theme: 'dark' })
            setOpenModal(false)
            onSuccess(true)
        }

    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGUPDATE DATA PENILAIAN SIFAT PEMIMPIN?
                    </Text>
                    <Group justify="space-between" pt={10}>
                        <Button
                            radius={10}
                            color="gray.7"
                            w={150}
                            onClick={() => setOpenModal(false)}
                        >
                            TIDAK
                        </Button>
                        <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => onUpload()}>
                            YA
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}