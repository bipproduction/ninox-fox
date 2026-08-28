"use client"
import { MasterKabGetByProvince, MasterKecGetByKab } from "@/modules/_global";
import { Stack, Box, Paper, Select, Button, Modal, Text } from "@mantine/core";
import { useAtom } from "jotai";
import _ from "lodash";
import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { isModalGenerateSe } from "../val/val_se";
import ModalGenerateSe from "../components/modal_generate_se";
import funCekSeBatch from "../fun/cek_se_batch";

export default function ViewGenerateSe({ param, provinsi, kabupaten, kecamatan }: { param: any, provinsi: any, kabupaten: any, kecamatan: any }) {
   const [openModal, setOpenModal] = useAtom(isModalGenerateSe);

   const [dataProvinsi] = useState(provinsi)
   const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
   const [dataKecamatan, setDataKecamatan] = useState<any>(kecamatan)
   const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
   const [isKabupaten, setKabupaten] = useState<any>(param.idKabkot || null)
   const [isKecamatan, setKecamatan] = useState<any>(param.idKec || null)
   const [loading, setLoading] = useState(false)

   const [scope, setScope] = useState<{ idProvinsi: number, idKabkot?: number, idKecamatan?: number }>({ idProvinsi: 0 })
   const [wilayah, setWilayah] = useState("")
   const [filled, setFilled] = useState(0)

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

   function labelWilayah() {
      const prov = dataProvinsi.find((p: any) => String(p.id) === String(isProvinsi))?.name
      const kab = dataKabupaten.find((k: any) => String(k.id) === String(isKabupaten))?.name
      const kec = dataKecamatan.find((k: any) => String(k.id) === String(isKecamatan))?.name
      if (kec) return `KECAMATAN ${kec}`
      if (kab) return `${kab}`
      return `PROVINSI ${prov}`
   }

   async function onGenerate() {
      if (_.isNull(isProvinsi)) {
         return toast("Silahkan pilih provinsi", { theme: "dark" })
      }
      setLoading(true)

      const newScope = {
         idProvinsi: Number(isProvinsi),
         idKabkot: _.isNull(isKabupaten) ? 0 : Number(isKabupaten),
         idKecamatan: _.isNull(isKecamatan) ? 0 : Number(isKecamatan),
      }

      const cek = await funCekSeBatch(newScope)
      setLoading(false)

      if (cek.total == 0) {
         return toast("Tidak ada data pada wilayah tersebut", { theme: "dark" })
      }

      setScope(newScope)
      setWilayah(labelWilayah())
      setFilled(cek.filled)
      setOpenModal(true)
   }

   return (
      <>
         <Stack>
            <Text fw={"bold"}>GENERATE DATA SOSIAL EKONOMI</Text>
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
                     placeholder="Pilih Kabupaten/Kota (kosongkan untuk semua)"
                     data={dataKabupaten.map((kab: any) => ({
                        value: String(kab.id),
                        label: kab.name
                     }))}
                     value={(!_.isNull(isKabupaten) ? String(isKabupaten) : null)}
                     label="Kabupaten/Kota"
                     searchable
                     clearable
                     onChange={(val) => (_.isNull(val) ? (setKabupaten(null), setKecamatan(null), setDataKecamatan([])) : onKabupaten({ idKab: val }))}
                  />
                  <Select
                     placeholder="Pilih Kecamatan (kosongkan untuk semua)"
                     data={dataKecamatan.map((kec: any) => ({
                        value: String(kec.id),
                        label: kec.name
                     }))}
                     value={(!_.isNull(isKecamatan) ? String(isKecamatan) : null)}
                     label="Kecamatan"
                     searchable
                     clearable
                     onChange={(val) => setKecamatan(val)}
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
            <ModalGenerateSe
               scope={scope}
               wilayah={wilayah}
               filled={filled}
               onSuccess={() => { }}
            />
         </Modal>
      </>
   )
}
