'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { useState } from "react"
import { funLogUser } from "@/modules/user"
import _ from "lodash"
import { isModalKeamanan } from "../val/val_keamanan"
import funUploadPerkelahian from "../fun/upload_perkelahian"
import funUploadPencurian from "../fun/upload_pencurian"
import funUploadPencurianDanKekerasan from "../fun/upload_pencurian_dan_kekerasan"
import funUploadPenipuanDanPenggelapan from "../fun/upload_penipuan_dan_penggelapan"
import funUploadPenganiayaan from "../fun/upload_penganiayaan"
import funUploadPerkosaan from "../fun/upload_perkosaan"
import funUploadNarkoba from "../fun/upload_narkoba"
import { funAddNotifications } from "@/modules/_global"

/**
 * Menampilkan modal konfirmasi upload data audience
 * Yang jika klik "NO" maka modal akan close,
 * sedangkan jika klik "YES" maka data akan diupload.
 * @param data data yang akan diupdload
 * @param onSuccess callback function
 * @returns komponen modal upload data audience
 */

export default function ModalUploadKeamanan({ kategori, data, onSuccess }: { kategori: any, data: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalKeamanan)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        if (kategori == 'perkelahian') {
            await funUploadPerkelahian({ body: data })
        } else if (kategori == 'pencurian') {
            await funUploadPencurian({ body: data })
        } else if (kategori == 'pencurian dan kekerasan') {
            await funUploadPencurianDanKekerasan({ body: data })
        } else if (kategori == 'penipuan dan penggelapan') {
            await funUploadPenipuanDanPenggelapan({ body: data })
        } else if (kategori == 'penganiayaan') {
            await funUploadPenganiayaan({ body: data })
        } else if (kategori == 'perkosaan') {
            await funUploadPerkosaan({ body: data })
        } else if (kategori == 'narkoba') {
            await funUploadNarkoba({ body: data })
        }

        await funLogUser({ act: 'UPL', desc: `User mengupload data ${kategori}`, idContent: '-', tbContent: `se_keamanan` })
        await funAddNotifications({ kategori: 'kamtibmas', provinsiId: data[0].idProvinsi })
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
                        ANDA YAKIN INGIN MENGUPDATE DATA {_.upperCase(kategori)}?
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