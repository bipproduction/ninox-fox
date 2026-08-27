"use client"
import { MasterKabGetByProvince } from "@/modules/_global";
import { funGetCandidateActiveByArea } from "@/modules/candidate";
import { Stack, Box, Paper, Select, Button, Modal, Text } from "@mantine/core";
import { useAtom } from "jotai";
import _ from "lodash";
import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { isModalGenerateSwot } from "../val/val_swot";
import ModalGenerateSwot from "../component/modal_generate_swot";

export default function ViewGenerateSwot({ param, provinsi, kabupaten, candidate }: { param: any, provinsi: any, kabupaten: any, candidate: any }) {
   const [openModal, setOpenModal] = useAtom(isModalGenerateSwot);

   const [dataProvinsi, setDataProvinsi] = useState(provinsi)
   const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
   const [dataCandidate, setDataCandidate] = useState<any>(candidate)
   const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
   const [isKabupaten, setKabupaten] = useState<any>(param.idKabkot || null)
   const [isCandidate, setCandidate] = useState<any>(null)
   const [loading, setLoading] = useState(false)
   const [genCandidates, setGenCandidates] = useState<{ id: string, name: string }[]>([])

   useEffect(() => {
      setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
      setKabupaten((param.idKabkot == 0) ? null : param.idKabkot)
      setDataCandidate(candidate)
      setDataKabupaten(kabupaten)
   }, [param, candidate, kabupaten])

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

   async function onGenerate() {
      setLoading(true)
      if (_.isNull(isProvinsi)) {
         setLoading(false)
         return toast("Silahkan pilih provinsi", { theme: "dark" })
      }
      if (_.isNull(isCandidate)) {
         setLoading(false)
         return toast("Silahkan pilih kandidat", { theme: "dark" })
      }

      const candidates = (isCandidate === "ALL")
         ? dataCandidate.map((c: any) => ({ id: String(c.id), name: c.name }))
         : dataCandidate.filter((c: any) => String(c.id) === String(isCandidate)).map((c: any) => ({ id: String(c.id), name: c.name }))

      setLoading(false)

      if (candidates.length == 0) {
         return toast("Tidak ada kandidat pada wilayah tersebut", { theme: "dark" })
      }

      setGenCandidates(candidates)
      setOpenModal(true)
   }

   return (
      <>
         <Stack>
            <Text fw={"bold"}>GENERATE DATA SWOT</Text>
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
                     placeholder="Pilih Kabupaten/Kota (kosongkan untuk semua)"
                     data={dataKabupaten.map((kab: any) => ({
                        value: String(kab.id),
                        label: kab.name
                     }))}
                     value={(!_.isNull(isKabupaten) ? String(isKabupaten) : null)}
                     label="Kabupaten/Kota"
                     searchable
                     clearable
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
                     onChange={(val) => setCandidate(val)}
                  />
                  <Button bg={"gray"} onClick={() => onGenerate()} loading={loading}>
                     GENERATE DATA
                  </Button>
               </Stack>
            </Paper>
         </Box>
         <Modal
            size={"md"}
            opened={openModal}
            onClose={() => setOpenModal(false)}
            centered
            withCloseButton={false}
            closeOnClickOutside={false}
         >
            <ModalGenerateSwot
               candidates={genCandidates}
               provinsi={Number(isProvinsi)}
               onSuccess={() => { }}
            />
         </Modal>
      </>
   )
}
