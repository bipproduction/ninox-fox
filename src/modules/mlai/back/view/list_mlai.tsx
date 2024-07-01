'use client'
import { Button, Group, Select, Stack, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import TableMlAi from "../component/table_mlai"
import { useRouter, useSearchParams } from "next/navigation"
import { MasterKabGetByProvince } from "@/modules/_global"
import toast from "react-simple-toasts"
import _ from "lodash"

/**
 * Fungsi untuk menampilkan table list mlai.
 * @param {string} title - Judul table.
 * @returns {component} Table list mlai sesuai dengan parameter.
 */

export default function ListMlAi({ params, provinsi, kabupaten, datatable }: { params: any, provinsi: any, kabupaten: any, datatable: any }) {
    const router = useRouter();
    const [dataProvinsi, setDataProvinsi] = useState(provinsi)
    const [dataKabupaten, setDatakabupaten] = useState<any>(kabupaten)
    const [isProvinsi, setProvinsi] = useState<any>(params.idProvinsi || null)
    const [isKabupaten, setKabupaten] = useState<any>(params.idKabkot || null)

    async function onKabupaten({ idProv }: { idProv: any }) {
        setProvinsi(idProv)
        setKabupaten(null)
        const dataKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
        setDatakabupaten(dataKab)
    }

    function onProsses() {
        if (isProvinsi == null) return toast("Silahkan pilih provinsi", { theme: "dark" })
        router.replace("/dashboard/ml-ai?prov=" + isProvinsi + "&city=" + isKabupaten)
    }

    useEffect(() => {
        setProvinsi(params.idProvinsi == 0 ? null : params.idProvinsi)
        setKabupaten(params.idKabkot == 0 ? null : params.idKabkot)
        setDatakabupaten(kabupaten)
    }, [params, kabupaten])

    return (
        <>
            <Stack>
                <Text fw={"bold"}>ML - AI</Text>
            </Stack>
            <Group grow mt={30}>
                <Select
                    placeholder="Pilih Provinsi"
                    data={dataProvinsi.map((pro: any) => ({
                        value: String(pro.id),
                        label: pro.name
                    }))}
                    required
                    label={"Provinsi"}
                    value={(_.isNull(isProvinsi)) ? null : String(isProvinsi)}
                    onChange={(val) => (
                        onKabupaten({ idProv: val })
                    )}
                    searchable
                />
                <Select
                    placeholder="Pilih Kabupaten/Kota"
                    data={dataKabupaten.map((kab: any) => ({
                        value: String(kab.id),
                        label: kab.name
                    }))}
                    searchable
                    label={"Kabupaten"}
                    value={(_.isNull(isKabupaten)) ? null : String(isKabupaten)}
                    onChange={(val) => (
                        setKabupaten(val)
                    )}
                />
                <Button mt={25} bg={"gray"} onClick={() => onProsses()}>
                    PROSES
                </Button>
                <Button mt={25} bg={"gray"} onClick={() => router.push("ml-ai/add")}>
                    TAMBAH ML-AI
                </Button>
            </Group>
            {!_.isNull(datatable.title) &&
                <TableMlAi title={datatable.title} data={datatable.data} searchParam={params} nPage={datatable.nPage} />
            }
        </>
    )
}