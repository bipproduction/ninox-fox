'use client'
import { MasterKabGetByProvince } from "@/modules/_global";
import { funGetCandidateActiveByArea } from "@/modules/candidate";
import { Stack, Box, Paper, Select, Button, Modal, Text, Group, Alert } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useAtom } from "jotai";
import _ from "lodash";
import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import moment from "moment";
import { isModalGenerateMlAi } from "../val/val_mlai";
import ModalGenerateMlAi from "../component/modal_generate_mlai";
import funCekMlAiBatch from "../fun/cek_mlai_batch";

export default function ViewGenerateMlAi({ param, provinsi, kabupaten, candidate }: { param: any, provinsi: any, kabupaten: any, candidate: any }) {
   const today = new Date();
   const [openModal, setOpenModal] = useAtom(isModalGenerateMlAi);

   const [dataProvinsi] = useState(provinsi)
   const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
   const [dataCandidate, setDataCandidate] = useState<any>(candidate)
   const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
   const [isKabupaten, setKabupaten] = useState<any>(param.idKabkot || null)
   const [isCandidate, setCandidate] = useState<any>(param.idCandidate || null)
   const [isDate, setDate] = useState<[Date | null, Date | null]>((_.isNull(param.date)) ? [today, today] : [new Date(param.date), new Date(param.date)])
   const [isValid, setValid] = useState(false)
   const [loading, setLoading] = useState(false)
   const [genCandidates, setGenCandidates] = useState<string[]>([])
   const [genDates, setGenDates] = useState<string[]>([])
   const [openOverwrite, setOpenOverwrite] = useState(false)
   const [overwriteCount, setOverwriteCount] = useState(0)

   useEffect(() => {
      setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
      setKabupaten((param.idKabkot == 0) ? null : param.idKabkot)
      setCandidate((param.idCandidate == 0) ? null : param.idCandidate)
      setDate((param.date == null) ? [new Date(), new Date()] : [new Date(param.date), new Date(param.date)])
      setDataCandidate(candidate)
      setDataKabupaten(kabupaten)
   }, [param, candidate, kabupaten])

   async function onProvinsi({ idProv }: { idProv: any }) {
      setValid(false)
      setProvinsi(idProv)
      setKabupaten(null)
      setCandidate(null)
      const dataDbKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
      const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(idProv), tingkat: 1 } })
      setDataKabupaten(dataDbKab)
      setDataCandidate(dataDbCan)
   }

   async function onKabupaten({ idKab }: { idKab: any }) {
      setValid(false)
      setKabupaten(idKab)
      setCandidate(null)
      const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(isProvinsi), idKabkot: Number(idKab), tingkat: 2 } })
      setDataCandidate(dataDbCan)
   }

   function getDateRange(start: Date, end: Date) {
      const result: string[] = []
      let cur = moment(start)
      const last = moment(end)
      while (cur.isSameOrBefore(last, 'day')) {
         result.push(cur.format('YYYY-MM-DD'))
         cur = cur.add(1, 'day')
      }
      return result
   }

   async function onCek() {
      setLoading(true)
      setValid(false)
      if (_.isNull(isProvinsi)) {
         setLoading(false)
         return toast("Silahkan pilih provinsi", { theme: "dark" })
      }
      if (_.isNull(isCandidate)) {
         setLoading(false)
         return toast("Silahkan pilih kandidat", { theme: "dark" })
      }
      if (_.isNull(isDate[0]) || _.isNull(isDate[1])) {
         setLoading(false)
         return toast("Silahkan pilih range tanggal", { theme: "dark" })
      }

      const candidateIds = (isCandidate === "ALL") ? dataCandidate.map((c: any) => String(c.id)) : [isCandidate]
      const dateList = getDateRange(isDate[0], isDate[1])

      if (candidateIds.length == 0) {
         setLoading(false)
         return toast("Tidak ada kandidat pada wilayah tersebut", { theme: "dark" })
      }

      const cek = await funCekMlAiBatch({ candidates: candidateIds, dates: dateList })

      setGenCandidates(candidateIds)
      setGenDates(dateList)

      if (cek.ada) {
         setLoading(false)
         setOverwriteCount(cek.count)
         setOpenOverwrite(true)
      } else {
         setLoading(false)
         setValid(true)
      }
   }

   function onProccess() {
      setOpenModal(true)
   }

   return (
      <>
         <Stack>
            <Text fw={"bold"}>GENERATE DATA ML-AI</Text>
         </Stack>
         <Box pt={30}>
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
                     placeholder="Pilih Kandidat"
                     data={[
                        { value: "ALL", label: "SEMUA KANDIDAT" },
                        ...dataCandidate.map((can: any) => ({
                           value: String(can.id),
                           label: can.name
                        }))
                     ]}
                     required
                     value={isCandidate}
                     label={"Kandidat"}
                     searchable
                     onChange={(val) => {
                        setValid(false)
                        setCandidate(val)
                     }}
                  />
                  <DatePickerInput
                     type="range"
                     valueFormat="DD-MM-YYYY"
                     required
                     value={isDate}
                     label={"Range Tanggal"}
                     placeholder="PILIH RANGE TANGGAL"
                     onChange={(val) => {
                        setValid(false)
                        setDate(val)
                     }}
                  />
                  <Button bg={"gray"} onClick={() => onCek()} loading={loading}>
                     CEK
                  </Button>
               </Stack>
            </Paper>
            {
               isValid && (
                  <Paper shadow="xs" p="xl" mt={"lg"}>
                     <Text fw={"bold"} mb={10}>SIAP GENERATE</Text>
                     <Text mb={20} c={"dimmed"}>
                        {genCandidates.length} kandidat × {genDates.length} tanggal ({moment(genDates[0]).format('DD/MM/YYYY')} - {moment(genDates[genDates.length - 1]).format('DD/MM/YYYY')}), jam 01:00. Konten beberapa paragraf akan dibuat otomatis dan berbeda tiap kandidat & tanggal.
                     </Text>

                     <Group justify="flex-end">
                        <Button
                           bg={"gray"}
                           onClick={() => onProccess()}
                        >
                           PROSES
                        </Button>
                     </Group>
                  </Paper>
               )
            }
         </Box>
         <Modal
            size={"md"}
            opened={openOverwrite}
            onClose={() => setOpenOverwrite(false)}
            centered
            withCloseButton={false}
            closeOnClickOutside={false}
         >
            <Alert color="gray" variant="outline">
               <Text fw={700} ta={"center"} mb={20} mt={20}>
                  DITEMUKAN DATA PADA {overwriteCount} KOMBINASI KANDIDAT & TANGGAL. MELANJUTKAN AKAN MENGGANTI DATA LAMA TERSEBUT. LANJUTKAN?
               </Text>
               <Group justify="space-between" pt={10}>
                  <Button
                     radius={10}
                     color="gray.7"
                     w={150}
                     onClick={() => setOpenOverwrite(false)}
                  >
                     BATAL
                  </Button>
                  <Button
                     radius={10}
                     color="gray.7"
                     w={150}
                     onClick={() => {
                        setOpenOverwrite(false)
                        setValid(true)
                     }}
                  >
                     LANJUTKAN
                  </Button>
               </Group>
            </Alert>
         </Modal>
         <Modal
            size={"md"}
            opened={openModal}
            onClose={() => setOpenModal(false)}
            centered
            withCloseButton={false}
            closeOnClickOutside={false}
         >
            <ModalGenerateMlAi candidates={genCandidates} dates={genDates} provinsi={isProvinsi} onSuccess={() => {
               setValid(false)
            }} />
         </Modal>
      </>
   )
}
