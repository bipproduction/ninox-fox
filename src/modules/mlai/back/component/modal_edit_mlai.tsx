'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { isModalMlAi } from "../val/val_mlai"
import toast from "react-simple-toasts"
import { useRouter } from "next/navigation"
import funEditMlAi from "../fun/fun_edit_mlai"
import { funAddNotifications, funGetAccessArea } from "@/modules/_global"
import { funLogUser } from "@/modules/user"
import { useState } from "react"

/**
 * Fungsi untuk menampilkan modal konfirmasi edit ml ai.
 * @returns {component} modal konfirmasi edit ml ai.
 */

export default function ModalEditMlAi({ data, content }: { data: any, content: any }) {
    const [openModal, setOpenModal] = useAtom(isModalMlAi)
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    async function onEditMlAi() {
        setLoading(true)
        const cek = await funGetAccessArea({ candidate: data.idCandidate })
        if (!cek) {
            setLoading(false)
            setOpenModal(false)
            return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
        }
        const edit = await funEditMlAi({ body: data, text: content })
        if (data.idRequest == null) {
            await funLogUser({ act: 'UPD', desc: `User mengubah data ML-AI`, idContent: data.id, tbContent: 'mlai' })
            // di-off-in karena masa iyaa waktu udh lewat ada notif
            // await funAddNotifications({ kategori: 'mlai', candidateId: data.idCandidate })
        } else {
            await funLogUser({ act: 'UPD', desc: `User mengubah jawaban data Request ML-AI`, idContent: data.idRequest, tbContent: 'mlaiRequest' })
            // di-off-in karena masa iyaa waktu udh lewat ada notif
            // await funAddNotifications({ kategori: 'mlai-request', candidateId: data.idCandidate })
        }
        toast("Sukses", { theme: "dark" });
        setOpenModal(false);
        setLoading(false)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGEDIT ML-AI?
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
                        <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => onEditMlAi()}>
                            YA
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}