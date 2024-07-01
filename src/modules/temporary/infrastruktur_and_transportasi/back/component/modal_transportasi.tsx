'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { useState } from "react"
import { funLogUser } from "@/modules/user"
import _ from "lodash"
import { isModalTransportasi } from "../val/val_transportasi"
import funUploadPermukaanJalan from "../fun/upload_permukaan_jalan"
import funUploadJalanDilaluiKendaraan from "../fun/upload_jalan_dilalui_kendaraan"
import funUploadKecelakaan from "../fun/upload_kecelakaan"
import { funAddNotifications } from "@/modules/_global"

/**
 * Menampilkan modal konfirmasi upload data audience
 * Yang jika klik "NO" maka modal akan close,
 * sedangkan jika klik "YES" maka data akan diupload.
 * @param data data yang akan diupdload
 * @param onSuccess callback function
 * @returns komponen modal upload data audience
 */

export default function ModalUploadTransportasi({ kategori, data, onSuccess }: { kategori: any, data: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalTransportasi)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        if (kategori == 'permukaan jalan') {
            await funUploadPermukaanJalan({ body: data })
        } else if (kategori == 'jalan dilalui kendaraan') {
            await funUploadJalanDilaluiKendaraan({ body: data })
        } else if (kategori == 'kecelakaan') {
            await funUploadKecelakaan({ body: data })
        }
        await funLogUser({ act: 'UPL', desc: `User mengupload data ${kategori}`, idContent: '-', tbContent: `se_transportasi` })
        await funAddNotifications({ kategori: 'infrastruktur-transportasi', provinsiId: data[0].idProvinsi })
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
                        ANDA YAKIN INGIN MENGUPDATE {_.upperCase(kategori)}?
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