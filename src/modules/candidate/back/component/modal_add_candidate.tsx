'use client'
import { Alert, Box, Button, Grid, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { isModalCandidate } from "../val/isModalCandidate";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";
import funAddCandidate from "../fun/add_candidate";
import { funGetAccessArea } from "@/modules/_global";
import { funLogUser } from "@/modules/user";
import { useState } from "react";

/**
 * Fungsi untuk menampilkan modal konfirmasi add kandidat.
 * @returns {component} Modal konfirmasi add kandidat.
 */

export default function ModalAddCandidate({ data, img, onSuccess }: { data: any, img: any, onSuccess: (val: any) => void }) {
    const [openModal, setOpenModal] = useAtom(isModalCandidate)
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    async function onCreateCandidate() {
        setLoading(true)
        const cek = await funGetAccessArea({ provinsi: data.idProvinsi })
        if (!cek) {
            setLoading(false)
            setOpenModal(false)
            return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
        }
        const create = await funAddCandidate({ body: data, img: img })
        if (!create.success)
            toast(create.message, { theme: "dark" });
        await funLogUser({ act: 'ADD', desc: `User menambah data kandidat`, idContent: create.data, tbContent: 'candidate' })
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
                        ANDA YAKIN INGIN MENAMBAHKAN KANDIDAT?
                    </Text>
                    <Grid>
                        <Grid.Col span={6}>
                            <Button
                                radius={10}
                                color="gray.7"
                                fullWidth
                                onClick={() => setOpenModal(false)}
                            >
                                TIDAK
                            </Button>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Button
                                radius={10}
                                color="gray.7"
                                fullWidth
                                onClick={() => onCreateCandidate()}
                                loading={isLoading}
                            >
                                YA
                            </Button>
                        </Grid.Col>
                    </Grid>
                </Alert>
            </Box>
        </>
    )
}