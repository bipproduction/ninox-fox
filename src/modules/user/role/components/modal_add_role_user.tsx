'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { useRouter } from "next/navigation"
import { isModalRoleUser } from "../val/val_role_user"
import funAddRoleUser from "../fun/add_role_user"
import funLogUser from "../../log/fun/add_log"
import { useState } from "react"

/**
 * Fungsi untuk menampilkan modal konfirmasi add role user.
 * @returns {component} modal konfirmasi add role user.
 */

export default function ModalAddRoleUser({ isName, value, onSuccess }: { isName: any, value: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalRoleUser)
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    async function onRoleUser() {
        setLoading(true)
        const create = await funAddRoleUser({ name: isName, component: value })
        if (!create.success) {
            setLoading(false)
            return toast(create.message, { theme: "dark" });
        }
        await funLogUser({ act: 'ADD', desc: `User menambah data Role User`, idContent: create.data, tbContent: 'roleuser' })
        toast("Sukses", { theme: "dark" });
        setOpenModal(false);
        onSuccess(true)
        setLoading(false)
        // router.back()
    }



    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENAMBAH ROLE USER?
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
                        <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => onRoleUser()}>
                            YA
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}
