'use client'
import { MasterKabGetByProvince } from "@/modules/_global";
import { funGetCandidateActiveByArea } from "@/modules/candidate";
import { Stack, Box, Paper, Select, Button, Modal, Text, Group, TextInput, NumberInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useAtom } from "jotai";
import _ from "lodash";
import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { isModalEmotion } from "../val/val_emotion";
import ModalSettingEmotion from "../components/modal/modal_setting_emotion";
import funCekEmotion from "../fun/cek_emotion";

export default function ViewSettingEmotion({ param, provinsi, kabupaten, candidate }: { param: any, provinsi: any, kabupaten: any, candidate: any }) {
   const today = new Date();
   const [openModal, setOpenModal] = useAtom(isModalEmotion);

   const [dataProvinsi, setDataProvinsi] = useState(provinsi)
   const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
   const [dataCandidate, setDataCandidate] = useState<any>(candidate)
   const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
   const [isKabupaten, setKabupaten] = useState<any>(param.idKabkot || null)
   const [isCandidate, setCandidate] = useState<any>(param.idCandidate || null)
   const [isDate, setDate] = useState<any>((_.isNull(param.date)) ? today : new Date(param.date))
   const [isValid, setValid] = useState(false)
   const [loading, setLoading] = useState(false)
   const [valPositif, setPositif] = useState(0)
   const [valNegatif, setNegatif] = useState(0)
   const [valNetral, setNetral] = useState(0)


   useEffect(() => {
      setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
      setKabupaten((param.idKabkot == 0) ? null : param.idKabkot)
      setCandidate((param.idCandidate == 0) ? null : param.idCandidate)
      setDate((param.date == null) ? new Date() : new Date(param.date))
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

      const cek = await funCekEmotion({ candidate: isCandidate, date: isDate })

      if (cek.ada) {
         setLoading(false)
         return toast("Tidak bisa melakukan setting data, karena data sudah ada", { theme: "dark" })

      } else {
         setLoading(false)
         setValid(true)
      }
   }

   function onProccess() {
      if ((valPositif + valNegatif + valNetral) !== 100)
         return toast("Total positif, negatif dan netral harus 100%", { theme: "dark" })

      setOpenModal(true)
   }

   return (
      <>
         <Stack>
            <Text fw={"bold"}>SETTING DATA EMOSI KANDIDAT</Text>
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
                     placeholder="Pilih Kandidat"
                     data={dataCandidate.map((can: any) => ({
                        value: String(can.id),
                        label: can.name
                     }))}
                     required
                     value={isCandidate}
                     label={"Kandidat"}
                     searchable
                     onChange={(val) => {
                        setValid(false)
                        setCandidate(val)
                     }}
                  />
                  <DateInput valueFormat="DD-MM-YYYY" required value={isDate}
                     label={"Select Date"} placeholder="SELECT DATE" onChange={(val) => { setDate(val) }} />
                  <Button bg={"gray"} onClick={() => onCek()} loading={loading}>
                     CEK
                  </Button>
               </Stack>
            </Paper>
            {
               isValid && (
                  <Paper shadow="xs" p="xl" mt={"lg"}>
                     <Text fw={"bold"} mb={20}>SETTING VALUE</Text>
                     <Group justify="space-between" grow>
                        <NumberInput
                           label="Positif"
                           placeholder="Nilai positif"
                           rightSection={"%"}
                           value={valPositif}
                           onChange={(val) => {
                              setPositif(Number(val))
                           }}
                        />
                        <NumberInput
                           label="Netral"
                           placeholder="Nilai netral"
                           rightSection={"%"}
                           value={valNetral}
                           onChange={(val) => {
                              setNetral(Number(val))
                           }}

                        />
                        <NumberInput
                           label="Negatif"
                           placeholder="Nilai negatif"
                           rightSection={"%"}
                           value={valNegatif}
                           onChange={(val) => {
                              setNegatif(Number(val))
                           }}
                        />
                     </Group>

                     <Group justify="space-between" mt={50}>
                        <Text >Total : {(valPositif + valNegatif + valNetral)}%</Text>
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
            opened={openModal}
            onClose={() => setOpenModal(false)}
            centered
            withCloseButton={false}
            closeOnClickOutside={false}
         >
            <ModalSettingEmotion isCandidate={isCandidate} isDateCan={isDate} positif={valPositif} negatif={valNegatif} netral={valNetral} onSuccess={() => {
               setValid(false)
               setDate(null)
               setPositif(0)
               setNegatif(0)
               setNetral(0)
            }} />
         </Modal>
      </>
   )
}