'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { isModalSwot } from "../val/val_swot";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";
import funAddSwotf from "../fun/fun_add_swot";
import { funGetAccessArea } from "@/modules/_global";

/**
 * Fungsi untuk menampilkan modal konfirmasi add swot.
 * @returns {component} Modal konfirmasi add swot.
 */

export default function ModalAddSwot({ data, text }: { data: any, text: any }) {
    const [openModal, setOpenModal] = useAtom(isModalSwot)
    const router = useRouter()

    async function onCreateSwot() {
        const cek = await funGetAccessArea({ candidate: data.idCandidate })
        if (!cek) {
            setOpenModal(false)
            return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
        }
        const addData = await funAddSwotf({ body: data, content: text })
        if (!addData.success) return toast(addData.message, { theme: "dark" });
        toast("Success", { theme: "dark" });
        setOpenModal(false);
        router.back()
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
                            NO
                        </Button>
                        <Button radius={10} color="gray.7" w={150} onClick={() => onCreateSwot()}>
                            YES
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}