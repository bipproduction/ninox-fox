'use client'

import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { isModalMlAi } from "../val/val_mlai"
import toast from "react-simple-toasts"
import { useRouter } from "next/navigation"

/**
 * Fungsi untuk menampilkan modal konfirmasi add ml ai.
 * @returns {component} modal konfirmasi add ml ai.
 */

export default function ModalAddMlAi() {
    const [openModal, setOpenModal] = useAtom(isModalMlAi)
    const router = useRouter()

    function onCreateMlAi() {
        toast("Success", { theme: "dark" });
        setOpenModal(false);
        router.back()
    }


    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ARE YOU SURE TO ADD ML-AI?
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
                        <Button radius={10} color="gray.7" w={150} onClick={() => onCreateMlAi()}>
                            YES
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}