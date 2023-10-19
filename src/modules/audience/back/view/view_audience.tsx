"use client"
import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import UploadDataAudience from "../components/upload_data_audience";
import TableDataAudience from "../components/table_data_audience";
import { useRouter } from "next/navigation";
import { MasterKabGetByProvince } from "@/modules/_global";
import { MasterKecGetByKab } from "@/modules/_global/fun/master_kecamatan_get_by_kabupaten";
import _ from "lodash";
import toast from "react-simple-toasts";


/**
 * Fungsi untuk menampilkan table list Audience.
 * @param {string} title - Judul table.
 * @returns {component} Table list audience sesuai dengan parameter.
 */


export default function ViewAudience({ param, provinsi, kabupaten, kecamatan, datatable }: { param: any, provinsi: any, kabupaten: any, kecamatan: any, datatable: any }) {
  const router = useRouter()

  const [dataProvinsi, setDataProvinsi] = useState(provinsi)
  const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
  const [dataKecamatan, setDataKecamatan] = useState<any>(kecamatan)
  const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
  const [isKabupaten, setKabupaten] = useState<any>(param.idKabkot || null)
  const [isKecamatan, setKecamatan] = useState<any>(param.idKec || null)


  useEffect(() => {
    setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
    setKabupaten((param.idKabkot == 0) ? null : param.idKabkot)
    setKecamatan((param.idKec == 0) ? null : param.idKec)
  }, [param])


  async function onProvinsi({ idProv }: { idProv: any }) {
    setProvinsi(idProv)
    setKabupaten(null)
    setKecamatan(null)
    const dataDbKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
    setDataKabupaten(dataDbKab)
    setDataKecamatan([])
  }


  async function onKabupaten({ idKab }: { idKab: any }) {
    setKabupaten(idKab)
    setKecamatan(null)
    const dataDbKec = await MasterKecGetByKab({ idKabkot: idKab })
    setDataKecamatan(dataDbKec)
  }

  function onProccess() {
    if (_.isNull(isProvinsi)) return toast("Silahkan pilih provinsi", { theme: "dark" })
    router.replace('/dashboard/audience?prov=' + isProvinsi + '&city=' + isKabupaten + '&kec=' + isKecamatan)
  }


  return (
    <>
      <Stack>
        <Text fw={"bold"}>AUDIENCE</Text>
      </Stack>
      <Box pt={30}>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 2 }}
          spacing={{ base: 10, sm: "xl" }}

        >
          <Box>
            <Paper shadow="xs" p="xl">
              <Stack>
                <Select
                  placeholder="PROVINCE"
                  data={dataProvinsi.map((pro: any) => ({
                    value: String(pro.id),
                    label: pro.name
                  }))}
                  value={isProvinsi}
                  required
                  label={"Provinsi"}
                  searchable
                  onChange={(val) => onProvinsi({ idProv: val })}
                />
                <Select
                  placeholder="CITY"
                  data={dataKabupaten.map((kab: any) => ({
                    value: String(kab.id),
                    label: kab.name
                  }))}
                  value={isKabupaten}
                  label="Kabupaten/Kota"
                  searchable
                  onChange={(val) => onKabupaten({ idKab: val })}
                />
                <Select
                  placeholder="SUBDISTRICT"
                  data={dataKecamatan.map((kec: any) => ({
                    value: String(kec.id),
                    label: kec.name
                  }))}
                  value={isKecamatan}
                  label="Kecamatan"
                  searchable
                  onChange={(val) => setKecamatan(val)}
                />
                <Button
                  bg={"gray"}
                  onClick={() => onProccess()}
                >
                  PROCCESS
                </Button>
              </Stack>
            </Paper>
          </Box>
          <Group justify="center" grow style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 20
          }}>

            <UploadDataAudience />
            <Box
              style={{
                border: "1px dashed gray",
                borderRadius: 10,
                padding: 40,
                cursor: "pointer"
              }}
            >
              <Text ta={"center"} size="xl" inline>
                DOWNLOAD
              </Text>
            </Box>
          </Group>
        </SimpleGrid>
      </Box>
      {!_.isNull(datatable.title) &&
        <Box pt={30}>
          <TableDataAudience data={datatable.data} title={datatable.title} th={datatable.thTitle} />
        </Box>
      }
    </>
  );
}
