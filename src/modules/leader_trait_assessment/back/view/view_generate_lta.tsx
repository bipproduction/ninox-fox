"use client"
import { MasterKabGetByProvince, MasterKecGetByKab } from "@/modules/_global";
import { Stack, Box, Paper, Select, Button, Modal, Text, Group, Alert } from "@mantine/core";
import { useAtom } from "jotai";
import _ from "lodash";
import { useState, useEffect } from "react";
import toast from "react-simple-toasts";
import { isModalGenerateLta } from "../val/val_lta";
import ModalGenerateLta from "../components/modal_generate_lta";
import funCountLtaBatch from "../fun/count_lta_batch";

export default function ViewGenerateLta({ param, provinsi, kabupaten, kecamatan }: { param: any, provinsi: any, kabupaten: any, kecamatan: any }) {
   const [openModal, setOpenModal] = useAtom(isModalGenerateLta);

   const [dataProvinsi, setDataProvinsi] = useState(provinsi)
   const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
   const [dataKecamatan, setDataKecamatan] = useState<any>(kecamatan)
   const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
   const [isKabupaten, setKabupaten] = useState<any>(param.idKabkot || null)
   const [isKecamatan, setKecamatan] = useState<any>(param.idKec || null)
   const [loading, setLoading] = useState(false)
   const [genCount, setGenCount] = useState(0)

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

   async function onGenerate() {
      setLoading(true)
      if (_.isNull(isProvinsi)) {
         setLoading(false)
         return toast("Silahkan pilih provinsi", { theme: "dark" })
      }

      const cek = await funCountLtaBatch({ idProvinsi: Number(isProvinsi), idKabkot: isKabupaten ? Number(isKabupaten) : null, idKecamatan: isKecamatan ? Number(isKecamatan) : null })

      setLoading(false)

      if (cek.count == 0) {
         return toast("Tidak ada data kelurahan pada wilayah tersebut", { theme: "dark" })
      }

      setGenCount(cek.count)
      setOpenModal(true)
   }

   return (
      <>
         <Stack>
            <Text fw={"bold"}>GENERATE DATA PENILAIAN SIFAT PEMIMPIN</Text>
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
            <ModalGenerateLta
               idProvinsi={Number(isProvinsi)}
               idKabkot={isKabupaten ? Number(isKabupaten) : null}
               idKecamatan={isKecamatan ? Number(isKecamatan) : null}
               count={genCount}
               onSuccess={() => { }}
            />
         </Modal>
      </>
   )
}
