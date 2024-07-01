'use client'
import { Button, Group, Select, Stack, Text } from "@mantine/core"
import TableStep from "../component/table_step"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MasterKabGetByProvince } from "@/modules/_global";
import toast from "react-simple-toasts";
import _ from "lodash"

/**
 * Fungsi untuk menampilkan table list step.
 * @param {string} title - Judul table.
 * @returns {component} Table list step sesuai dengan parameter.
 */

export default function ListStep({ params, provinsi, kabupaten, datatable }: { params: any, provinsi: any, kabupaten: any, datatable: any }) {
    const router = useRouter();
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
        router.replace("/dashboard/step?prov=" + isProvinsi + "&city=" + isKabupaten)
    }

    useEffect(() => {
        setProvinsi(params.idProvinsi == 0 ? null : params.idProvinsi)
        setKabupaten(params.idKabkot == 0 ? null : params.idKabkot)
        setDataKabupaten(kabupaten)
    }, [params, kabupaten])

    return (
        <>
            <Stack>
                <Text fw={"bold"}>ANALISA STEP</Text>
            </Stack>
            <Group grow mt={30}>
                <Select
                    placeholder="Pilih Provinsi"
                    data={dataProvinsi.map((val: any) => ({
                        value: String(val.id),
                        label: val.name,
                    }))}
                    required
                    value={(_.isNull(isProvinsi)) ? null : String(isProvinsi)}
                    onChange={(val) => (
                        onKabupaten({ idProv: val })
                    )}
                    label={"Provinsi"}
                    searchable
                />
                <Select
                    placeholder="Pilih Kabupaten/Kota"
                    label={"Kabupaten"}
                    searchable
                    data={dataKabupaten.map((val: any) => ({
                        value: String(val.id),
                        label: val.name,
                    }))}
                    value={(_.isNull(isKabupaten)) ? null : String(isKabupaten)}
                    onChange={(val) => (
                        setKabupaten(val)
                    )}
                />
                <Button mt={25} bg={"gray"} onClick={() => onProsses()}>
                    PROSES
                </Button>

                <Button mt={25} bg={"gray"} onClick={() => router.push("step/add")}>
                    TAMBAH STEP
                </Button>
            </Group>
            {!_.isNull(datatable.title) &&
                <TableStep title={datatable.title} data={datatable.data} searchParam={params} />
            }
        </>
    )
}