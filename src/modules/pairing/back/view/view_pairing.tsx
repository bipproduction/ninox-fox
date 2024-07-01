"use client";
import {
  Box,
  Button,
  Center,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TableDataPairing from "../components/table_data_pairing";
import { DateInput } from "@mantine/dates";
import _ from "lodash";
import moment from "moment";
import { MasterKabGetByProvince } from "@/modules/_global";
import { funGetCandidateActiveByArea } from "@/modules/candidate";
import toast from "react-simple-toasts";
import papa from "papaparse"

/**
 * Fungsi untuk menampilkan table list pairing.
 * @param {string} title - Judul table.
 * @returns {component} Table list pairing sesuai dengan parameter.
 */

export default function ViewPairing({ param, provinsi, kabupaten, candidate, datatable, dataDownload }: { param: any, provinsi: any, kabupaten: any, candidate: any, datatable: any, dataDownload: any }) {
  const router = useRouter()
  const today = new Date();

  const [dataProvinsi, setDataProvinsi] = useState(provinsi)
  const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
  const [dataCandidate, setDataCandidate] = useState<any>(candidate)
  const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
  const [isKabupaten, setKabupaten] = useState<any>(param.idKabkot || null)
  const [isCandidate1, setCandidate1] = useState<any>(param.idCandidate1 || null)
  const [isCandidate2, setCandidate2] = useState<any>(param.idCandidate2 || null)
  const [isDate, setDate] = useState<any>((_.isNull(param.date)) ? today : new Date(param.date))

  console.log(datatable)



  useEffect(() => {
    setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
    setKabupaten((param.idKabkot == 0) ? null : param.idKabkot)
    setCandidate1((param.idCandidate1 == 0) ? null : param.idCandidate1)
    setCandidate2((param.idCandidate2 == 0) ? null : param.idCandidate2)
    setDate((param.date == null) ? new Date() : new Date(param.date))
    setDataKabupaten(kabupaten)
    setDataCandidate(candidate)
  }, [param, kabupaten, candidate])



  async function onProvinsi({ idProv }: { idProv: any }) {
    setProvinsi(idProv)
    setKabupaten(null)
    setCandidate1(null)
    setCandidate2(null)
    const dataDbKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
    const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(idProv), tingkat: 1 } })
    setDataKabupaten(dataDbKab)
    setDataCandidate(dataDbCan)
  }

  async function onKabupaten({ idKab }: { idKab: any }) {
    setKabupaten(idKab)
    setCandidate1(null)
    setCandidate2(null)
    const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(isProvinsi), idKabkot: Number(idKab), tingkat: (idKab == null) ? 1 : 2 } })
    setDataCandidate(dataDbCan)
  }


  function onProccess() {
    if (_.isNull(isProvinsi)) return toast("Silahkan pilih provinsi", { theme: "dark" })
    if (_.isNull(isCandidate1)) return toast("Silahkan pilih kandidat pertama", { theme: "dark" })
    if (_.isNull(isCandidate2)) return toast("Silahkan pilih kandidat kedua", { theme: "dark" })
    router.replace('/dashboard/pairing?prov=' + isProvinsi + '&city=' + isKabupaten + '&can1=' + isCandidate1 + '&can2=' + isCandidate2 + '&date=' + moment(isDate).format("YYYY-MM-DD"))
  }



  return (
    <>
      <Stack>
        <Text fw={"bold"}>PENILAIAN SENTIMEN PEMILIH DAN DATA PASANGAN REGIONAL</Text>
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
                  value={(!_.isNull(isKabupaten) ? String(isKabupaten) : null)}
                  label="Kabupaten/Kota"
                  searchable
                  onChange={(val) => onKabupaten({ idKab: val })}
                />
                <Select
                  placeholder="KANDIDAT 1"
                  data={dataCandidate.map((can: any) => ({
                    value: String(can.id),
                    label: can.name
                  }))}
                  required
                  value={isCandidate1}
                  label={"Kandidat 1"}
                  searchable
                  onChange={(val) => {
                    setCandidate2(null)
                    setCandidate1(val)
                  }}
                />
                <Select
                  placeholder="KANDIDAT 2"
                  data={dataCandidate.map((can: any) => ({
                    value: String(can.id),
                    label: can.name
                  }))}
                  required
                  value={isCandidate2}
                  label={"Kandidat 2"}
                  searchable
                  onChange={(val) => {
                    if (val == isCandidate1) {
                      setCandidate2(null)
                      toast("Kandidat 1 & 2 tidak boleh sama", { theme: "dark" })
                    } else {
                      setCandidate2(val)
                    }
                  }}
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

                  onClick={() => router.push("/dashboard/pairing/upload")}
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
                  onClick={() => router.push("pairing/copy-data")}
                >
                  <Text c={"white"} fw={"bold"} ta={"center"}>
                    COPY DATA
                  </Text>
                </Box>
              </Box>
            </Group>

            {(param.idProvinsi > 0) && (!_.isEmpty(dataDownload.data)) &&
              <Box mt={30}>
                <Box
                  style={{
                    backgroundColor: "white",
                    padding: 27,
                    borderRadius: 10,
                  }}
                >
                  <Center>
                    <Box
                      style={{
                        border: "1px dashed gray",
                        borderRadius: 10,
                        padding: 50,
                        cursor: "pointer",
                      }}

                      onClick={() => {
                        const dataJson = dataDownload.data
                        const jsonData = papa.unparse(dataJson)
                        const jsonDataUrl = "data:text/csv;charset=utf-8," + encodeURIComponent(jsonData)

                        const jsonDwnloadLink = document.createElement("a")
                        jsonDwnloadLink.href = jsonDataUrl
                        jsonDwnloadLink.download = dataDownload.title + ".csv"
                        jsonDwnloadLink.click()
                      }}

                    >
                      <Text ta={"center"} size="xl" inline>
                        DOWNLOAD
                      </Text>
                    </Box>
                  </Center>
                </Box>
              </Box>
            }
          </Box>
        </SimpleGrid>
      </Box>
      {(param.idProvinsi > 0) && (!_.isNull(datatable.th)) &&
        <Box pt={30}>
          <TableDataPairing data={datatable.data} th={datatable.th} />
        </Box>
      }
    </>
  );
}
