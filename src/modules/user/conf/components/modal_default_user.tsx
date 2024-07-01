'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { isModalConf } from "../val/isModalConf";
import { useState } from "react";
import toast from "react-simple-toasts";
import funUpdateUserArea from "@/modules/_global/home/fan/update_user_area_front";
import { funLogUser } from "../..";

export default function ModalUpdateDefaultUser({ prov, kab, can, user }: { prov: any, kab: any, can: any, user: any }) {
    const [valOpenModal, setOpenModal] = useAtom(isModalConf)
    const [loadingData, setLoadingData] = useState(false)

    async function onUser() {
        setLoadingData(true)
        const data = await funUpdateUserArea({ provinsi: prov, kabkot: kab, candidate: can, user: user })
        await funLogUser({ act: 'UPD', desc: `User mengubah data default User`, idContent: user, tbContent: 'user-area' })
        toast('Success', { theme: 'dark' })
        setLoadingData(false)
        setOpenModal(false)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGUPDATE DEFAULT WILAYAH & KANDIDAT USER?
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
                        <Button loading={loadingData} radius={10} color="gray.7" w={150} onClick={onUser}>
                            YA
                        </Button>
                    </Group>
                </Alert>
            </Box>
        </>
    )
}