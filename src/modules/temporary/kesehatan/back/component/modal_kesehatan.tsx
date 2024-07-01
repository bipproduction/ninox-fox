'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { useState } from "react"
import { funLogUser } from "@/modules/user"
import _ from "lodash"
import { isModalKesehatan } from "../val/val_kesehatan"
import funUploadKelasIbuHamil from "../fun/upload_kelas_ibu_hamil"
import funUploadIbuHamilDariKeluargaMiskin from "../fun/upload_ibu_hamil_dari_keluarga_miskin"
import funUploadJaminanUntukBaduta from "../fun/upload_jaminan_untuk_baduta"
import funUploadPosPelayanan from "../fun/upload_pos_pelayanan"
import funUploadFasilitas from "../fun/upload_fasilitas"
import funUploadRataRataJarakFasilitas from "../fun/upload_rata_rata_jarak_fasilitas"
import funUploadJumlahDokter from "../fun/upload_jumlah_dokter"
import { funAddNotifications } from "@/modules/_global"

/**
 * Menampilkan modal konfirmasi upload data audience
 * Yang jika klik "NO" maka modal akan close,
 * sedangkan jika klik "YES" maka data akan diupload.
 * @param data data yang akan diupdload
 * @param onSuccess callback function
 * @returns komponen modal upload data audience
 */

export default function ModalUploadKesehatan({ kategori, data, onSuccess }: { kategori: any, data: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalKesehatan)
    const [isLoading, setLoading] = useState(false)

    async function onUpload() {
        setLoading(true)
        if (kategori == 'kelas ibu hamil') {
            await funUploadKelasIbuHamil({ body: data })
        } else if (kategori == 'ibu hamil dari keluarga miskin') {
            await funUploadIbuHamilDariKeluargaMiskin({ body: data })
        } else if (kategori == 'jaminan untuk baduta') {
            await funUploadJaminanUntukBaduta({ body: data })
        } else if (kategori == 'pos pelayanan') {
            await funUploadPosPelayanan({ body: data })
        } else if (kategori == 'fasilitas') {
            await funUploadFasilitas({ body: data })
        } else if (kategori == 'rata rata jarak fasilitas') {
            await funUploadRataRataJarakFasilitas({ body: data })
        } else if (kategori == 'jumlah dokter') {
            await funUploadJumlahDokter({ body: data })
        }

        await funLogUser({ act: 'UPL', desc: `User mengupload data ${kategori}`, idContent: '-', tbContent: `se_kesehatan` })
        await funAddNotifications({ kategori: 'kesehatan', provinsiId: data[0].idProvinsi })
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
                        ANDA YAKIN INGIN MENGUPDATE DATA INI?
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