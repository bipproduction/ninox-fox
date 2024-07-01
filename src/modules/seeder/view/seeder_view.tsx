'use client'
import { Box, Button, Divider, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core"
import { useState } from "react"
import toast from "react-simple-toasts";
import { funSeederProvinsi } from "../fun/fun_provinsi";
import { funSeederKabupaten } from "../fun/fun_kabupaten";
import { funSeederKecamatan } from "../fun/fun_kecamatan";
import { funSeederDesa } from "../fun/fun_desa";
import { funSeederLeader } from "../fun/fun_leader";
import { funSeederPublic } from "../fun/fun_public";
import { funSeederComponents } from "../fun/fun_component";
import { funSeederUserRole } from "../fun/fun_user_role";
import { funSeederUserAccess } from "../fun/fun_user_access";
import { funSeederUser } from "../fun/fun_user";
import funSeederAudience from "../fun/fun_audience";
import funSeederPct from "../fun/fun_pct";
import funSeederLta from "../fun/fun_lta";
import funSeederRhi from "../fun/fun_rhi";
import funSeederUserArea from "../fun/fun_user_area";
import funSeederSosialEkonomi from "../fun/fun_sosial_ekonomi";

/**
 * Fungsi untuk menampilkan view halaman seeder.
 * @returns  Hasil menampilkan beberapa button untuk seeder.
 */

export default function SeederView() {
    const [loading, setLoading] = useState(false)


    // USER
    async function onCOmponents() {
        setLoading(true);
        const res = await funSeederComponents();
        if (res?.success)
            return setLoading(false), toast(res?.message, { theme: "dark" });
    }
    async function onUserRole() {
        setLoading(true);
        const res = await funSeederUserRole();
        if (res?.success)
            return setLoading(false), toast(res?.message, { theme: "dark" });
    }
    async function onUserAccess() {
        setLoading(true);
        const res = await funSeederUserAccess();
        if (res?.success)
            return setLoading(false), toast(res?.message, { theme: "dark" });
    }
    async function onUser() {
        setLoading(true);
        const res = await funSeederUser();
        if (res?.success)
            return setLoading(false), toast(res?.message, { theme: "dark" });
    }

    // WILAYAH
    async function onProvince() {
        setLoading(true);
        const res = await funSeederProvinsi();
        if (res?.success)
            return setLoading(false), toast(res?.message, { theme: "dark" });
    }
    async function onKabupaten() {
        setLoading(true)
        const res = await funSeederKabupaten()
        if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }
    async function onKecamatan() {
        setLoading(true)
        const res = await funSeederKecamatan()
        if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }
    async function onKelurahan() {
        setLoading(true)
        const res = await funSeederDesa()
        if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }

    // DATA LAINYA
    async function onSeederUserArea() {
        setLoading(true)
        const res = await funSeederUserArea()
        if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }

    async function onLeader() {
        setLoading(true)
        const res = await funSeederLeader()
        if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }
    async function onPublic() {
        setLoading(true)
        const res = await funSeederPublic()
        if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }
    async function onAudience() {
        setLoading(true)
        const res = await funSeederAudience()
        if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }

    async function onPCTFix() {
        setLoading(true)
        const res = await funSeederPct()
        if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }

    async function onLTAFix() {
        setLoading(true)
        const res = await funSeederLta()
        if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }

    async function onRHIFix() {
        setLoading(true)
        const res = await funSeederRhi()
        if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }

    async function onSosialEkonomi() {
        setLoading(true)
        const res = await funSeederSosialEkonomi()
        if (res?.success) return setLoading(false), toast(res?.message, { theme: "dark" })
    }



    return (
        <>
            <Stack>
                <Text fw={"bold"}>SEEDER</Text>
            </Stack>
            <Box pt={30}>
                <SimpleGrid
                    cols={{ base: 2, sm: 2, lg: 2 }}
                    spacing={{ base: 10, sm: "xl" }}
                    verticalSpacing={{ base: "md", sm: "xl" }}
                >
                    <Box>
                        <Paper shadow="xs" p="lg">
                            <Text fw={"bold"}>USER</Text>
                            <Divider mt={10} mb={20} />
                            <Text fz={10} c={"red"}>** Seeder Mulai Dari Yang Teratas</Text>
                            <Group justify="center" my={15}>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onCOmponents}>COMPONENTS</Button>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onUserRole}>USER ROLE</Button>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onUserAccess}>USER ACCESS</Button>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onUser}>USER</Button>
                            </Group>
                        </Paper>
                    </Box>
                    <Box>
                        <Paper shadow="xs" p="lg">
                            <Text fw={"bold"}>WILAYAH</Text>
                            <Divider mt={10} mb={20} />
                            <Text fz={10} c={"red"}>** Seeder Mulai Dari Yang Teratas</Text>
                            <Group justify="center" my={15}>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onProvince}>PROVINSI</Button>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onKabupaten}>KABUPATEN / KOTA</Button>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onKecamatan}>KECAMATAN</Button>
                                <Button bg={"gray"} fullWidth loading={loading} onClick={onKelurahan}>DESA</Button>
                            </Group>
                        </Paper>
                    </Box>

                </SimpleGrid>
                <Box mt={30}>
                    <Paper shadow="xs" p="lg">
                        <Text fw={"bold"}>DATA LAINNYA</Text>
                        <Divider mt={10} mb={30} />
                        <Group justify="center" gap="md" grow my={15}>
                            {/* <Button bg={"gray"} loading={loading} onClick={onLeader}>CATEGORY PENILAIAN SIFAT PEMIMPIN</Button> */}
                            {/* <Button bg={"gray"} loading={loading} onClick={onPublic}>CATEGORY TREN PERHATIAN PUBLIK</Button> */}
                            <Button bg={"gray"} loading={loading} onClick={onSeederUserArea}>USER AREA</Button>
                            <Button bg={"gray"} loading={loading} onClick={onAudience}>VALUE SUARA TERKUNCI</Button>
                            <Button bg={"gray"} loading={loading} onClick={onPCTFix}>VALUE TREN PERHATIAN PUBLIK</Button>
                        </Group>
                        <Group justify="center" gap="md" grow my={15}>
                            <Button bg={"gray"} loading={loading} onClick={onLTAFix}>VALUE PENILAIAN SIFAT PEMIMPIN</Button>
                            <Button bg={"gray"} loading={loading} onClick={onRHIFix}>VALUE ISU WILAYAH</Button>
                            <Button bg={"gray"} loading={loading} onClick={onSosialEkonomi}>DATA SOSIAL EKONOMI</Button>
                        </Group>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}