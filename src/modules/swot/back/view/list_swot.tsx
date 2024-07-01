'use client'
import { Button, Group, Select, Stack, Text } from "@mantine/core"
import { useRouter } from "next/navigation";
import TableSwot from "../component/table_swot";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { MasterKabGetByProvince } from "@/modules/_global";
import _ from "lodash"

/**
 * Fungsi untuk menampilkan table list swot.
 * @param {string} params - Judul table.
 * @param {string} provinsi - Judul table.
 * @param {string} kabupaten - Judul table.
 * @param {string} datatable - Judul table.
 * @returns {component} Table list swot sesuai dengan parameter.
 */

export default function ListSwot({ params, provinsi, kabupaten, datatable }: { params: any, provinsi: any, kabupaten: any, datatable: any }) {
    const router = useRouter()

    const [dataProvinsi, setDataProvinsi] = useState(provinsi)
    const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
    const [isProvinsi, setProvinsi] = useState<any>(String(params.idProvinsi) || null)
    const [isKabupaten, setKabupaten] = useState<any>(String(params.idKabkot) || null)

    async function onKabupaten({ idProv }: { idProv: any }) {
        setProvinsi(idProv)
        setKabupaten(null)
        const dataKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
        setDataKabupaten(dataKab)
    }

    function onProsses() {
        if (isProvinsi == null) return toast("Silahkan pilih provinsi", { theme: "dark" })
        router.replace("/dashboard/swot?prov=" + isProvinsi + "&city=" + isKabupaten)
    }

    useEffect(() => {
        setProvinsi(params.idProvinsi == 0 ? null : params.idProvinsi)
        setKabupaten(params.idKabkot == 0 ? null : params.idKabkot)
        setDataKabupaten(kabupaten)
    }, [params, kabupaten])

    return (
        <>
            <Stack>
                <Text fw={"bold"}>ANALISA SWOT</Text>
            </Stack>
            <Group grow mt={30}>
                <Select
                    placeholder="Pilih Provinsi"
                    data={dataProvinsi.map((pro: any) => ({
                        value: String(pro.id),
                        label: pro.name,
                    }))}
                    required
                    label={"Provinsi"}
                    searchable
                    value={(_.isNull(isProvinsi)) ? null : String(isProvinsi)}
                    onChange={(val) => (
                        onKabupaten({ idProv: val })
                    )}
                />
                <Select
                    label={"Kabupaten"}
                    placeholder="Pilih Kabupaten/Kota"
                    data={dataKabupaten.map((kab: any) => ({
                        value: String(kab.id),
                        label: kab.name,
                    }))}
                    value={(_.isNull(isKabupaten)) ? null : String(isKabupaten)}
                    onChange={(val) => (
                        setKabupaten(val)
                    )}
                    searchable
                />
                <Button mt={25} bg={"gray"} onClick={() => onProsses()}>
                    PROSES
                </Button>
                <Button mt={25} bg={"gray"} onClick={() => router.push("swot/add")}>
                    TAMBAH SWOT
                </Button>
            </Group>
            {!_.isNull(datatable.title) &&
                <TableSwot title={datatable.title} data={datatable.data} searchParam={params} />
            }
        </>
    )
}
