'use client'
import { Alert, Box, Button, Grid, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { isModalCandidate } from "../val/isModalCandidate";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";
import funEditCandidate from "../fun/edit_candidate";
import { funGetAccessArea } from "@/modules/_global";
import { funLogUser } from "@/modules/user";
import { useState } from "react";

/**
 * Fungsi untuk menampilkan modal konfirmasi edit kandidat.
 * @returns {component} Modal konfirmasi edit kandidat.
 */

export default function ModalEditCandidate({ data, provinsi, img }: { data: any, provinsi: any, img: any }) {
    const [openModal, setOpenModal] = useAtom(isModalCandidate)
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)

    async function onEditCandidate() {
        setLoading(true)
        const cek = await funGetAccessArea({ provinsi: provinsi })
        if (!cek) {
            setLoading(false)
            setOpenModal(false)
            return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
        }
        const edit = await funEditCandidate({ body: data, img: img })
        await funLogUser({ act: 'UPD', desc: `User mengubah data kandidat`, idContent: data.id, tbContent: 'candidate' })
        toast("Sukses", { theme: "dark" });
        setOpenModal(false);
        setLoading(false)
    }

    return (
        <>
            <Box>
                <Alert color="gray" variant="outline">
                    <Text fw={700} ta={"center"} mb={20} mt={20}>
                        ANDA YAKIN INGIN MENGEDIT DATA KANDIDAT?
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
                                loading={isLoading}
                                onClick={() => onEditCandidate()}
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