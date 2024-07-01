'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { isModalSwot } from "../val/val_swot";
import toast from "react-simple-toasts";
import funEditSwot from "../fun/fun_edit_swot";
import { funAddNotifications, funGetAccessArea } from "@/modules/_global";
import { funLogUser } from "@/modules/user";
import { useState } from "react";

/**
 * Fungsi untuk menampilkan modal konfirmasi edit swot.
 * @returns {component} Modal konfirmasi edit swot.
 */

export default function ModalEditSwot({ data, content }: { data: any, content: any }) {
    const [openModal, setOpenModal] = useAtom(isModalSwot)
    const [isLoading, setLoading] = useState(false)

    async function onEditSwot() {
        setLoading(true)
        const cek = await funGetAccessArea({ candidate: data.idCandidate })
        if (!cek) {
            setLoading(false)
            setOpenModal(false)
            return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
        }
        const edit = await funEditSwot({ body: data, text: content })
        await funLogUser({ act: 'UPD', desc: `User mengubah data SWOT`, idContent: data.id, tbContent: 'swot' })
        await funAddNotifications({ kategori: 'swot', candidateId: data.idCandidate })
        toast("Sukses", { theme: "dark" });
        setOpenModal(false);
        setLoading(false)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGEDIT SWOT?
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
                        <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => onEditSwot()}>
                            YA
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}