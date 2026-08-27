"use client"
import { MasterKabGetByProvince } from "@/modules/_global";
import { Stack, Box, Paper, Select, Button, Modal, Text, NumberInput } from "@mantine/core";
import { useAtom } from "jotai";
import _ from "lodash";
import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { isModalGenerateCandidate } from "../val/isModalCandidate";
import ModalGenerateCandidate from "../component/modal_generate_candidate";

export default function ViewGenerateCandidate({ param, provinsi, kabupaten }: { param: any, provinsi: any, kabupaten: any }) {
   const [openModal, setOpenModal] = useAtom(isModalGenerateCandidate);

   const [dataProvinsi, setDataProvinsi] = useState(provinsi)
   const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
   const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
   const [isKabupaten, setKabupaten] = useState<any>(param.idKabkot || null)
   const [count, setCount] = useState<any>(2)
   const [genParam, setGenParam] = useState<any>(null)

   useEffect(() => {
      setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
      setKabupaten((param.idKabkot == 0) ? null : param.idKabkot)
      setDataKabupaten(kabupaten)
   }, [param, kabupaten])

   async function onProvinsi({ idProv }: { idProv: any }) {
      setProvinsi(idProv)
      setKabupaten(null)
      const dataDbKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
      setDataKabupaten(dataDbKab)
   }

   function onGenerate() {
      if (_.isNull(isProvinsi)) {
         return toast("Silahkan pilih provinsi", { theme: "dark" })
      }
      if (!count || count < 1) {
         return toast("Jumlah kandidat minimal 1", { theme: "dark" })
      }

      setGenParam({
         idProvinsi: Number(isProvinsi),
         idKabkot: _.isNull(isKabupaten) ? null : Number(isKabupaten),
         tingkat: _.isNull(isKabupaten) ? 1 : 2,
         count: Number(count)
      })
      setOpenModal(true)
   }

   return (
      <>
         <Stack>
            <Text fw={"bold"}>GENERATE DATA KANDIDAT</Text>
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
                     placeholder="Pilih Kabupaten/Kota (kosongkan untuk tingkat provinsi)"
                     data={dataKabupaten.map((kab: any) => ({
                        value: String(kab.id),
                        label: kab.name
                     }))}
                     value={(!_.isNull(isKabupaten) ? String(isKabupaten) : null)}
                     label="Kabupaten/Kota"
                     searchable
                     clearable
                     onChange={(val) => setKabupaten(val)}
                  />
                  <NumberInput
                     label="Jumlah Kandidat"
                     placeholder="Jumlah kandidat yang akan digenerate"
                     required
                     min={1}
                     max={20}
                     value={count}
                     onChange={setCount}
                  />
                  <Button bg={"gray"} onClick={() => onGenerate()}>
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
            {genParam &&
               <ModalGenerateCandidate
                  idProvinsi={genParam.idProvinsi}
                  idKabkot={genParam.idKabkot}
                  tingkat={genParam.tingkat}
                  count={genParam.count}
                  onSuccess={() => { }}
               />
            }
         </Modal>
      </>
   )
}
