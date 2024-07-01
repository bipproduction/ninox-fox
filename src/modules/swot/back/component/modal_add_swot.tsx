'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { isModalSwot } from "../val/val_swot";
import toast from "react-simple-toasts";
import funAddSwotf from "../fun/fun_add_swot";
import { funAddNotifications, funGetAccessArea } from "@/modules/_global";
import { funLogUser } from "@/modules/user";
import { useState } from "react";

/**
 * Fungsi untuk menampilkan modal konfirmasi add swot.
 * @returns {component} Modal konfirmasi add swot.
 */

export default function ModalAddSwot({ data, textS, textW, textO, textT, onSuccess }: { data: any, textS: any, textW: any, textO: any, textT: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalSwot)
    const [isLoading, setLoading] = useState(false)

    async function onCreateSwot() {
        setLoading(true)
        const cek = await funGetAccessArea({ candidate: data.idCandidate })
        if (!cek) {
            setOpenModal(false)
            setLoading(false)
            return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
        }
        const addData = await funAddSwotf({ body: data, S: textS, W: textW, O: textO, T: textT })
        if (!addData.success) return toast(addData.message, { theme: "dark" });
        // await funLogUser({ act: 'ADD', desc: `User menambah data SWOT`, idContent: addData.data, tbContent: 'swot' })
        await funAddNotifications({ kategori: 'swot', candidateId: data.idCandidate })
        toast("Success", { theme: "dark" })
        setOpenModal(false)
        onSuccess(true)
        setLoading(false)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENAMBAH SWOT?
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
                        <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => onCreateSwot()}>
                            YA
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}