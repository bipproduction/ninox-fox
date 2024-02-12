'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { isModalStep } from "../val/val_step";
import toast from "react-simple-toasts";
import funAddStep from "../fun/fun_add_step";
import { funGetAccessArea } from "@/modules/_global";
import { funLogUser } from "@/modules/user";

/**
 * Fungsi untuk menampilkan modal konfirmasi add step.
 * @returns {component} Modal konfirmasi add step.
 */

export default function ModalAddStep({ data, text, onSuccess }: { data: any, text: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalStep)

    async function onCreateStep() {
        const cek = await funGetAccessArea({ candidate: data.idCandidate })
        if (!cek) {
            setOpenModal(false)
            return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
        }
        const addData = await funAddStep({ body: data, content: text })
        if (!addData.success) return toast(addData.message, { theme: "dark" });
        await funLogUser({ act: 'ADD', desc: `User menambah data STEP`, idContent: addData.data, tbContent: 'step' })
        toast("Success", { theme: "dark" })
        setOpenModal(false)
        onSuccess(true)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENAMBAH STEP?
                    </Text>
                    <Group justify="space-between" pt={10}>
                        <Button
                            radius={10}
                            color="gray.7"
                            w={150}
                            onClick={() => setOpenModal(false)}
                        >
                            NO
                        </Button>
                        <Button radius={10} color="gray.7" w={150} onClick={() => onCreateStep()}>
                            YES
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}