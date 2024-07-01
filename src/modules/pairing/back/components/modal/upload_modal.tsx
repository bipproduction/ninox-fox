'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { useState } from "react"
import { isModalPairing } from "../../val/val_modal_pairing"
import funUploadPairing from "../../fun/upload_pairing"
import { funLogUser } from "@/modules/user"
import { funAddNotifications, funGetAccessArea } from "@/modules/_global"
import moment from "moment"

export default function ModalUploadPairing({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalPairing)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        const cek = await funGetAccessArea({ provinsi: data[0].idProvinsi })
        if (!cek) {
            setLoading(false)
            return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
        }
        await funUploadPairing({ body: data })
        await funLogUser({ act: 'UPL', desc: `User mengupload data Penilaian sentimen pemilih dan Data pasangan regional (${data[0].idCandidate1} & ${data[0].idCandidate2} - ${moment(data[0].date).format('DD/MM/YYYY')})`, idContent: '-', tbContent: 'pairing' })
        await funAddNotifications({ kategori: 'pairing', candidateId: data[0].idCandidate1, candidateId2: data[0].idCandidate2 })
        setLoading(false)
        toast('Success', { theme: 'dark' })
        setOpenModal(false)
        onSuccess(true)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGUPLOAD DATA PENILAIAN SENTIMEN PEMILIH DAN DATA PASANGAN REGIONAL?
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