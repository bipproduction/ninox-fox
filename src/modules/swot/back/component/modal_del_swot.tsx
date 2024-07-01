'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { isModalSwot } from "../val/val_swot";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";
import funDeleteSwot from "../fun/fun_delete_swot";
import { funGetAccessArea } from "@/modules/_global";
import { funLogUser } from "@/modules/user";
import { useState } from "react";

/**
 * Fungsi untuk menampilkan modal konfirmasi delete swot.
 * @returns {component} Modal konfirmasi delete swot.
 */

export default function ModalDelSwot({ id, candidate, onSuccess }: { id: any, candidate: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalSwot)
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    async function onDelSwot() {
        setLoading(true)
        const cek = await funGetAccessArea({ candidate: candidate })
        if (!cek) {
            setLoading(false)
            setOpenModal(false)
            return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
        }
        const delData = await funDeleteSwot({ id: id })
        if (!delData.success) return toast(delData.message, { theme: "dark" })
        await funLogUser({ act: 'DEL', desc: `User menghapus data SWOT`, idContent: id, tbContent: 'swot' })
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
                        ANDA YAKIN INGIN MENGHAPUS SWOT?
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
                        <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => onDelSwot()}>
                            YA
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}