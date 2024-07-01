'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { isModalStep } from "../val/val_step";
import toast from "react-simple-toasts";
import funEditStep from "../fun/fun_edit_step";
import { funAddNotifications, funGetAccessArea } from "@/modules/_global";
import { funLogUser } from "@/modules/user";
import { useState } from "react";

/**
 * Fungsi untuk menampilkan modal konfirmasi edit step.
 * @returns {component} Modal konfirmasi edit step.
 */

export default function ModalEditStep({ data, content }: { data: any, content: any }) {
    const [openModal, setOpenModal] = useAtom(isModalStep)
    const [isLoading, setLoading] = useState(false)

    async function onEditStep() {
        setLoading(true)
        const cek = await funGetAccessArea({ candidate: data.idCandidate })
        if (!cek) {
            setLoading(false)
            setOpenModal(false)
            return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
        }
        const edit = await funEditStep({ body: data, text: content })
        await funLogUser({ act: 'UPD', desc: `User mengubah data STEP`, idContent: data.id, tbContent: 'step' })
        await funAddNotifications({ kategori: 'step', candidateId: data.idCandidate })
        toast("Sukses", { theme: "dark" });
        setOpenModal(false);
        setLoading(false)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGEDIT STEP?
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
                        <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => onEditStep()}>
                            YA
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}