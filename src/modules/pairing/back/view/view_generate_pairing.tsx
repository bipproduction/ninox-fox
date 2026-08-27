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
import { isModalGeneratePairing } from "../val/val_modal_pairing";
import ModalGeneratePairing from "../components/modal/modal_generate_pairing";
import funCekPairingBatch from "../fun/cek_pairing_batch";

export default function ViewGeneratePairing({ param, provinsi, kabupaten, candidate }: { param: any, provinsi: any, kabupaten: any, candidate: any }) {
   const today = new Date();
   const [openModal, setOpenModal] = useAtom(isModalGeneratePairing);

   const [dataProvinsi, setDataProvinsi] = useState(provinsi)
   const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
   const [dataCandidate, setDataCandidate] = useState<any>(candidate)
   const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
   const [isKabupaten, setKabupaten] = useState<any>(param.idKabkot || null)
   const [isCandidate1, setCandidate1] = useState<any>(param.idCandidate1 || null)
   const [isCandidate2, setCandidate2] = useState<any>(param.idCandidate2 || null)
   const [isDate, setDate] = useState<[Date | null, Date | null]>((_.isNull(param.date)) ? [today, today] : [new Date(param.date), new Date(param.date)])
   const [isValid, setValid] = useState(false)
   const [loading, setLoading] = useState(false)
   const [genPairs, setGenPairs] = useState<{ c1: string, c2: string }[]>([])
   const [genDates, setGenDates] = useState<string[]>([])
   const [openOverwrite, setOpenOverwrite] = useState(false)
   const [overwriteCount, setOverwriteCount] = useState(0)

   useEffect(() => {
      setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
      setKabupaten((param.idKabkot == 0) ? null : param.idKabkot)
      setCandidate1((param.idCandidate1 == 0) ? null : param.idCandidate1)
      setCandidate2((param.idCandidate2 == 0) ? null : param.idCandidate2)
      setDate((param.date == null) ? [new Date(), new Date()] : [new Date(param.date), new Date(param.date)])
      setDataCandidate(candidate)
      setDataKabupaten(kabupaten)
   }, [param, candidate, kabupaten])

   async function onProvinsi({ idProv }: { idProv: any }) {
      setValid(false)
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
      setValid(false)
      setKabupaten(idKab)
      setCandidate1(null)
      setCandidate2(null)
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

   function buildPairs() {
      const c1IsAll = isCandidate1 === "ALL"
      const c2IsAll = isCandidate2 === "ALL"
      const pairs: { c1: string, c2: string }[] = []

      if (c1IsAll && c2IsAll) {
         dataCandidate.forEach((a: any) => {
            dataCandidate.forEach((b: any) => {
               if (String(a.id) !== String(b.id)) pairs.push({ c1: String(a.id), c2: String(b.id) })
            })
         })
      } else if (c1IsAll) {
         dataCandidate.forEach((a: any) => {
            if (String(a.id) !== String(isCandidate2)) pairs.push({ c1: String(a.id), c2: String(isCandidate2) })
         })
      } else if (c2IsAll) {
         dataCandidate.forEach((b: any) => {
            if (String(b.id) !== String(isCandidate1)) pairs.push({ c1: String(isCandidate1), c2: String(b.id) })
         })
      } else {
         pairs.push({ c1: String(isCandidate1), c2: String(isCandidate2) })
      }

      return pairs
   }

   async function onCek() {
      setLoading(true)
      setValid(false)
      if (_.isNull(isProvinsi)) {
         setLoading(false)
         return toast("Silahkan pilih provinsi", { theme: "dark" })
      }
      if (_.isNull(isCandidate1)) {
         setLoading(false)
         return toast("Silahkan pilih kandidat pertama", { theme: "dark" })
      }
      if (_.isNull(isCandidate2)) {
         setLoading(false)
         return toast("Silahkan pilih kandidat kedua", { theme: "dark" })
      }
      if (isCandidate1 !== "ALL" && isCandidate1 === isCandidate2) {
         setLoading(false)
         return toast("Kandidat 1 & 2 tidak boleh sama", { theme: "dark" })
      }
      if (_.isNull(isDate[0]) || _.isNull(isDate[1])) {
         setLoading(false)
         return toast("Silahkan pilih range tanggal", { theme: "dark" })
      }

      const pairs = buildPairs()
      const dateList = getDateRange(isDate[0], isDate[1])

      const cek = await funCekPairingBatch({ pairs, dates: dateList })

      setGenPairs(pairs)
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
            <Text fw={"bold"}>GENERATE DATA PASANGAN KANDIDAT</Text>
         </Stack>
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
                     data={[
                        { value: "ALL", label: "SEMUA KANDIDAT" },
                        ...dataCandidate.map((can: any) => ({
                           value: String(can.id),
                           label: can.name
                        }))
                     ]}
                     required
                     value={isCandidate1}
                     label={"Kandidat 1"}
                     searchable
                     onChange={(val) => {
                        setValid(false)
                        setCandidate1(val)
                     }}
                  />
                  <Select
                     placeholder="KANDIDAT 2"
                     data={[
                        { value: "ALL", label: "SEMUA KANDIDAT" },
                        ...dataCandidate.map((can: any) => ({
                           value: String(can.id),
                           label: can.name
                        }))
                     ]}
                     required
                     value={isCandidate2}
                     label={"Kandidat 2"}
                     searchable
                     onChange={(val) => {
                        if (val !== "ALL" && isCandidate1 !== "ALL" && val == isCandidate1) {
                           toast("Kandidat 1 & 2 tidak boleh sama", { theme: "dark" })
                           return
                        }
                        setValid(false)
                        setCandidate2(val)
                     }}
                  />
                  <DatePickerInput
                     type="range"
                     valueFormat="DD-MM-YYYY"
                     required
                     value={isDate}
                     label={"Select Date"}
                     placeholder="SELECT DATE RANGE"
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
                        {genPairs.length} pasangan kandidat × {genDates.length} tanggal ({moment(genDates[0]).format('DD/MM/YYYY')} - {moment(genDates[genDates.length - 1]).format('DD/MM/YYYY')}). Nilai sentimen & rate akan dibuat otomatis secara acak dan berbeda tiap tanggal & pasangan kandidat.
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
                  DITEMUKAN DATA PADA {overwriteCount} KOMBINASI PASANGAN KANDIDAT & TANGGAL. MELANJUTKAN AKAN MENGHAPUS DATA LAMA TERSEBUT. LANJUTKAN?
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
            <ModalGeneratePairing pairs={genPairs} dates={genDates} provinsi={isProvinsi} onSuccess={() => {
               setValid(false)
            }} />
         </Modal>
      </>
   )
}
