'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { useState } from "react"
import { funLogUser } from "@/modules/user"
import { isModalKetenagakerjaan } from "../val/val_ketenagakerjaan"
import _ from "lodash"
import funUploadJaminanKesehatan from "../fun/upload_jaminan_kesehatan"
import funUploadJaminanKecelakaanKerja from "../fun/upload_jaminan_kecelakaan_kerja"
import funUploadJaminanKematian from "../fun/upload_jaminan_kematian"
import funUploadJaminanHariTua from "../fun/upload_jaminan_hari_tua"
import funUploadJaminanPensiun from "../fun/upload_jaminan_pensiun"
import funUploadPengangguran from "../fun/upload_pengangguran"
import { funAddNotifications } from "@/modules/_global"

/**
 * Menampilkan modal konfirmasi upload data audience
 * Yang jika klik "NO" maka modal akan close,
 * sedangkan jika klik "YES" maka data akan diupload.
 * @param data data yang akan diupdload
 * @param onSuccess callback function
 * @returns komponen modal upload data audience
 */

export default function ModalUploadKetenagakerjaan({ kategori, data, onSuccess }: { kategori: any, data: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalKetenagakerjaan)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        if (kategori == 'jaminan kesehatan') {
            await funUploadJaminanKesehatan({ body: data })
        } else if (kategori == 'jaminan kecelakaan kerja') {
            await funUploadJaminanKecelakaanKerja({ body: data })
        } else if (kategori == 'jaminan kematian') {
            await funUploadJaminanKematian({ body: data })
        } else if (kategori == 'jaminan hari tua') {
            await funUploadJaminanHariTua({ body: data })
        } else if (kategori == 'jaminan pensiun') {
            await funUploadJaminanPensiun({ body: data })
        } else if (kategori == 'pengangguran') {
            await funUploadPengangguran({ body: data })
        }
        await funLogUser({ act: 'UPL', desc: `User mengupload data ${kategori}`, idContent: '-', tbContent: `se_ketenagakerjaan` })
        await funAddNotifications({ kategori: 'ketenagakerjaan', provinsiId: data[0].idProvinsi })
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