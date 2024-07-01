'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import toast from "react-simple-toasts"
import { useRouter } from "next/navigation"
import { isModalRoleUser } from "../val/val_role_user"
import funUpdateRoleUser from "../fun/update_user_role"
import { funLogUser } from "../.."
import { useState } from "react"

/**
 * Fungsi untuk menampilkan modal konfirmasi Edit Role User.
 * @returns {component} modal konfirmasi Edit Role User.
 */

export default function ModalEditRoleUser({ name, component, id }: { name: any, component: any, id: any }) {
    const [openModal, setOpenModal] = useAtom(isModalRoleUser)
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    async function onRoleUser() {
        setLoading(true)
        const edit = await funUpdateRoleUser({ name: name, component: component, id: id })
        if (!edit.success) {
            setLoading(false)
            return toast(edit.message, { theme: "dark" });
        }
        toast("Sukses", { theme: "dark" });
        await funLogUser({ act: 'UPD', desc: `User mengubah data Role User`, idContent: id, tbContent: 'roleuser' })
        setOpenModal(false);
        setLoading(false)
    }


    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGEDIT ROLE USER?
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
