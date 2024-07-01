'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { isModalStep } from "../val/val_step";
import toast from "react-simple-toasts";
import funDeleteStep from "../fun/fun_delete_step";
import { funGetAccessArea } from "@/modules/_global";
import { funLogUser } from "@/modules/user";
import { useState } from "react";

/**
 * Fungsi untuk menampilkan modal konfirmasi delete step.
 * @returns {component} Modal konfirmasi delete step.
 */

export default function ModalDelStep({ id, candidate, onSuccess }: { id: any, candidate: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalStep)
    const [isLoading, setLoading] = useState(false)

    async function onDelStep() {
        setLoading(true)
        const cek = await funGetAccessArea({ candidate: candidate })
        if (!cek) {
            setLoading(false)
            setOpenModal(false)
            return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
        }
        const delData = await funDeleteStep({ id: id })
        if (!delData.success) return toast(delData.message, { theme: "dark" })
        await funLogUser({ act: 'DEL', desc: `User menghapus data STEP`, idContent: id, tbContent: 'step' })
        toast("Sukses", { theme: "dark" });
        setOpenModal(false);
        onSuccess(true)
        setLoading(false)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGHAPUS STEP?
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
                        <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => onDelStep()}>
                            YA
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}