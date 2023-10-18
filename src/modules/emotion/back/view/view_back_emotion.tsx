"use client";

import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import UploadData from "../components/upload_data";
import TableData from "../components/table_data";
import { MasterKabGetByProvince } from "@/modules/_global";
import _ from "lodash";
import { funGetCandidateActiveByArea } from "@/modules/candidate";
import moment from "moment";
import toast from "react-simple-toasts";


/**
 * Fungsi untuk menampilkan table list Emotion.
 * @param {string} title - Judul table.
 * @returns {component} Table list Emotion sesuai dengan parameter.
 */



export default function ViewBackEmotion({ param, provinsi, kabupaten, candidate, datatable }: { param: any, provinsi: any, kabupaten: any, candidate: any, datatable: any }) {
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
  }, [param])

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
    const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(isProvinsi), idKabkot: Number(idKab), tingkat: 2 } })
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
        <Text fw={"bold"}>EMOTION EDITOR</Text>
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
                  placeholder="CANDIDATE"
                  data={dataCandidate.map((can: any) => ({
                    value: String(can.id),
                    label: can.name
                  }))}
                  required
                  value={isCandidate}
                  label={"Candidate"}
                  searchable
                  onChange={(val) => { setCandidate(val) }}
                />
                <DateInput valueFormat="DD-MM-YYYY" required value={isDate}
                  label={"Select Date"} placeholder="SELECT DATE" onChange={(val) => { setDate(val) }} />
                <Button bg={"gray"} onClick={() => onProccess()}>
                  PROCCESS
                </Button>
              </Stack>
            </Paper>
          </Box>
          <Box>
            <Box style={{
              backgroundColor: "white",
              padding: 16,
              borderRadius: 10
            }}>
              <Group justify="center">

                <UploadData />
              </Group>
            </Box>
            {!_.isNull(datatable.title) && (
              <Group justify="space-between" grow pt={30}>
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
                  >
                    <Text c={"white"} fw={"bold"} ta={"center"}>
                      DOWNLOAD
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
            )}
          </Box>
        </SimpleGrid>
      </Box>
      {!_.isNull(datatable.title) && (
        <Box pt={20}>
          <TableData title={datatable.title} data={datatable.data} />
        </Box>
      )}
    </>
  );
}

// export default function ViewBackEmotion() {
