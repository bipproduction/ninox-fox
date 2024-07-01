'use client'
import { Box, Button, Center, Group, Paper, Select, SimpleGrid, Stack, Text, UnstyledButton } from "@mantine/core"
import { useEffect, useState } from "react"
import TableCandidate from "../component/table_candidate"
import { useRouter } from "next/navigation"
import toast from "react-simple-toasts"
import _ from "lodash"
import { MasterKabGetByProvince } from "@/modules/_global"

/**
 * Fungsi untuk menampilkan select wilayah.
 * @param {string} title - judul
 * @returns {component} Select wilayah.
 */

export default function ListCandidates({ param, provinsi, kabupaten, datatable }: { param: any, provinsi: any, kabupaten: any, datatable: any }) {

    const router = useRouter()
    const [dataProvinsi, setDataProvinsi] = useState(provinsi)
    const [dataKab, setDataKab] = useState<any>(kabupaten)
    const [isProvinsi, setProvinsi] = useState<any>(String(param.idProvinsi) || null)
    const [isKabupaten, setKabupaten] = useState<any>(String(param.idKabkot) || null)

    async function onKabupaten({ idProv }: { idProv: any }) {
        setProvinsi(idProv)
        setKabupaten(null)
        const dataDbKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
        setDataKab(dataDbKab)
    }

    function onProccess() {
        if (isProvinsi == null) return toast("Silahkan pilih provinsi", { theme: "dark" })
        router.replace('/dashboard/candidate?prov=' + isProvinsi + '&city=' + isKabupaten)
    }

    useEffect(() => {
        setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
        setKabupaten((param.idKabkot == 0) ? null : param.idKabkot)
        setDataKab(kabupaten)
    }, [param, kabupaten])

    return (
        <>

            <Stack>
                <Text fw={"bold"}>KANDIDAT</Text>
            </Stack>
            <Group grow mt={30}>
                <Select
                    placeholder="Pilih Provinsi"
                    data={dataProvinsi.map((pro: any) => ({
                        value: String(pro.id),
                        label: pro.name
                    }))}
                    searchable
                    label="Provinsi"
                    required
                    value={(!_.isNull(isProvinsi) ? String(isProvinsi) : null)}
                    onChange={(val) => {
                        onKabupaten({ idProv: val })
                    }}
                />
                <Select searchable
                    label="Kabupaten"
                    placeholder="Pilih Kabupaten/Kota"
                    data={dataKab.map((kab: any) => ({
                        value: String(kab.id),
                        label: kab.name
                    }))}
                    value={(!_.isNull(isKabupaten) ? String(isKabupaten) : null)}
                    onChange={(val) => {
                        setKabupaten(val)
                    }}
                />
                <Button mt={25} bg={"gray"} onClick={() => onProccess()}>
                    PROSES
                </Button>
                <Button mt={25} bg={"gray"} onClick={() => router.push('candidate/add')}>TAMBAH KANDIDAT</Button>
            </Group>
            {!_.isNull(datatable.title) &&
                <TableCandidate title={datatable.title} data={datatable.data} searchParam={param} />
            }
        </>
    )
}