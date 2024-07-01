"use client"
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
import React, { useEffect } from "react";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import TableData from "../components/table_data";
import { MasterKabGetByProvince } from "@/modules/_global";
import _ from "lodash";
import { funGetCandidateActiveByArea } from "@/modules/candidate";
import moment from "moment";
import toast from "react-simple-toasts";
import papa from "papaparse"

/**
 * Fungsi untuk menampilkan table list Emotion.
 * @param {string} title - Judul table.
 * @returns Table list Emotion sesuai dengan parameter.
 */

export default function ViewBackEmotion({ param, provinsi, kabupaten, candidate, datatable, datadownload }: { param: any, provinsi: any, kabupaten: any, candidate: any, datatable: any, datadownload: any }) {
  const router = useRouter()
  const today = new Date();

  const [dataProvinsi, setDataProvinsi] = useState(provinsi)
  const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
  const [dataCandidate, setDataCandidate] = useState<any>(candidate)
  const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
  const [isKabupaten, setKabupaten] = useState<any>(param.idKabkot || null)
  const [isCandidate, setCandidate] = useState<any>(param.idCandidate || null)
  const [isDate, setDate] = useState<any>((_.isNull(param.date)) ? today : new Date(param.date))

  useEffect(() => {
    setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
    setKabupaten((param.idKabkot == 0) ? null : param.idKabkot)
    setCandidate((param.idCandidate == 0) ? null : param.idCandidate)
    setDate((param.date == null) ? new Date() : new Date(param.date))
    setDataCandidate(candidate)
    setDataKabupaten(kabupaten)
  }, [param, kabupaten, candidate])

  async function onProvinsi({ idProv }: { idProv: any }) {
    setProvinsi(idProv)
    setKabupaten(null)
    setCandidate(null)
    const dataDbKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
    const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(idProv), tingkat: 1 } })
    setDataKabupaten(dataDbKab)
    setDataCandidate(dataDbCan)
  }

  async function onKabupaten({ idKab }: { idKab: any }) {
    setKabupaten(idKab)
    setCandidate(null)
    const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(isProvinsi), idKabkot: Number(idKab), tingkat: (idKab == null) ? 1 : 2  } })
    setDataCandidate(dataDbCan)
  }

  function onProccess() {
    if (_.isNull(isProvinsi)) return toast("Silahkan pilih provinsi", { theme: "dark" })
    if (_.isNull(isCandidate)) return toast("Silahkan pilih kandidat", { theme: "dark" })
    router.replace('/dashboard/emotion?prov=' + isProvinsi + '&city=' + isKabupaten + '&can=' + isCandidate + '&date=' + moment(isDate).format("YYYY-MM-DD"))
  }


  return (
    <>
      <Stack>
        <Text fw={"bold"}>SENTIMEN KANDIDAT</Text>
      </Stack>
      <Box pt={30}>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 2 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
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
                  value={(!_.isNull(isProvinsi) ? String(isProvinsi) : null)}
                  required
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
                  value={!_.isNull(isKabupaten) ? String(isKabupaten) : null}
                  label="Kabupaten/Kota"
                  searchable
                  onChange={(val) => onKabupaten({ idKab: val })}
                />
                <Select
                  placeholder="Pilih Kandidat"
                  data={dataCandidate.map((can: any) => ({
                    value: String(can.id),
                    label: can.name
                  }))}
                  required
                  value={isCandidate}
                  label={"Kandidat"}
                  searchable
                  onChange={(val) => { setCandidate(val) }}
                />
                <DateInput valueFormat="DD-MM-YYYY" required value={isDate}
                  label={"Select Date"} placeholder="SELECT DATE" onChange={(val) => { setDate(val) }} />
                <Button bg={"gray"} onClick={() => onProccess()}>
                  PROSES
                </Button>
              </Stack>
            </Paper>
          </Box>
          <Box>
            <Group justify="space-between" grow>
              <Box>
                <Box
                  style={{
                    borderRadius: 10,
                    padding: 30,
                    paddingTop: 50,
                    paddingBottom: 50,
                    backgroundColor: "gray",
                    cursor: "pointer",
                  }}

                  onClick={() => router.push("/dashboard/emotion/upload")}
                >
                  <Text c={"white"} fw={"bold"} ta={"center"}>
                    UPLOAD DATA
                  </Text>
                </Box>
              </Box>
              <Box>
                <Box
                  style={{
                    borderRadius: 10,
                    padding: 30,
                    paddingTop: 50,
                    paddingBottom: 50,
                    backgroundColor: "gray",
                    cursor: "pointer",
                  }}
                  onClick={() => router.push("emotion/copy-data")}
                >
                  <Text c={"white"} fw={"bold"} ta={"center"}>
                    COPY DATA
                  </Text>
                </Box>

              </Box>
            </Group>
            {!_.isNull(datatable.title) && (
              <Box pt={30}>
                <Box style={{
                  backgroundColor: "white",
                  padding: 16,
                  borderRadius: 10
                }}>
                  <Group justify="center">
                    <Box
                      style={{
                        border: "1px dashed gray",
                        borderRadius: 10,
                        padding: 50,
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
                  </Group>
                </Box>
              </Box>
            )}
          </Box>
        </SimpleGrid>
      </Box>
      {!_.isNull(datatable.title) && (
        <Box pt={20}>
          <TableData title={datatable.title} data={datatable.data} th={datatable.th} />
        </Box>
      )}
    </>
  );
}

