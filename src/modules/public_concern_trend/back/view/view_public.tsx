"use client"
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import TablePublic from "../components/table_public";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { MasterKabGetByProvince, MasterKecGetByKab } from "@/modules/_global";
import toast from "react-simple-toasts";
import papa from "papaparse"

/**
 * Fungsi untuk menampilkan table list public.
 * @param {string} title - Judul table.
 * @returns {component} Table list Public sesuai dengan parameter.
 */

function ViewPublic({ param, provinsi, kabupaten, kecamatan, datatable, datadownload }: { param: any, provinsi: any, kabupaten: any, kecamatan: any, datatable: any, datadownload: any }) {
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
    setDataKabupaten(kabupaten)
    setDataKecamatan(kecamatan)
  }, [param, kabupaten, kecamatan])


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
    // if (_.isNull(isProvinsi)) return toast("Silahkan pilih provinsi", { theme: "dark" })
    router.replace('/dashboard/public-concern-trend?prov=' + isProvinsi + '&city=' + isKabupaten + '&kec=' + isKecamatan)
  }


  return (
    <>
      <Stack>
        <Text fw={"bold"}>TREN PERHATIAN PUBLIK</Text>
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
                  placeholder="Pilih Provinsi"
                  data={dataProvinsi.map((pro: any) => ({
                    value: String(pro.id),
                    label: pro.name
                  }))}
                  value={(_.isNull(isProvinsi)) ? null : String(isProvinsi)}
                  label={"Provinsi"}
                  searchable
                  onChange={(val) => onProvinsi({ idProv: val })}
                />
                <Select
                  placeholder="Pilih Kabupaten/Kota"
                  data={dataKabupaten.map((kab: any) => ({
                    value: String(kab.id),
                    label: kab.name
                  }))}
                  value={(_.isNull(isKabupaten)) ? null : String(isKabupaten)}
                  label="Kabupaten/Kota"
                  searchable
                  onChange={(val) => onKabupaten({ idKab: val })}
                />
                <Select
                  placeholder="Pilih Kecamatan"
                  data={dataKecamatan.map((kec: any) => ({
                    value: String(kec.id),
                    label: kec.name
                  }))}
                  value={(_.isNull(isKecamatan)) ? null : String(isKecamatan)}
                  label="Kecamatan"
                  searchable
                  onChange={(val) => setKecamatan(val)}
                />
                <Button
                  bg={"gray"}
                  onClick={() => onProccess()}
                >
                  PROSES
                </Button>
              </Stack>
            </Paper>
          </Box>
          <Group
            justify="left"
            style={{
              backgroundColor: "white",
              borderRadius: 10,
            }}
            px={50}
          >
            <Box
              style={{
                border: "1px dashed gray",
                borderRadius: 10,
                paddingTop: 40,
                paddingBottom: 40,
                paddingLeft: 30,
                paddingRight: 30,
                cursor: "pointer",
              }}
              onClick={() => router.push("/dashboard/public-concern-trend/upload")}
            >
              <Text ta={"center"} size="xl" inline>
                UPLOAD DATA
              </Text>
            </Box>
            {param && !_.isNull(param.idProvinsi) && param.idProvinsi != 0 &&
              <Box
                style={{
                  border: "1px dashed gray",
                  borderRadius: 10,
                  padding: 40,
                  cursor: "pointer",
                }}

                onClick={() => {
                  const dataJson = datadownload.data

                  const jsonData = papa.unparse(dataJson)
                  const jsonDataUrl = "data:text/csv;charset=utf-8," + encodeURIComponent(jsonData)

                  const jsonDwnloadLink = document.createElement("a")
                  jsonDwnloadLink.href = jsonDataUrl
                  jsonDwnloadLink.download = datadownload.title + ".csv"
                  jsonDwnloadLink.click()
                }}
              >
                <Text ta={"center"} size="xl" inline>
                  DOWNLOAD
                </Text>
              </Box>
            }

          </Group>
        </SimpleGrid>
      </Box>
      {!_.isNull(datatable.title) && (
        <Box pt={30}>
          <TablePublic data={datatable.data} title={datatable.title} th={datatable.thTitle} />
        </Box>
      )}
    </>
  );
}

export default ViewPublic;
