"use client";
import { ButtonBack, MasterKabGetByProvince } from "@/modules/_global";
import { Box, Button, Group, Modal, Select, Stack, Text, TextInput, Textarea } from "@mantine/core";
import { useAtom } from "jotai";
import { useState } from "react";
import toast from "react-simple-toasts";
import { isModalNotifikasiAlert } from "../val/isModalNotifikasiAlert";
import ModalAddNotifikasi from "../components/modal_add_notifikasi";
import { funGetCandidateActiveByArea } from "@/modules/candidate";
import { DataMenu } from "../val/data_menu";

export default function ViewAddNotification({ provinsi, kabupaten }: { provinsi: any, kabupaten: any }) {
   const [openModal, setOpenModal] = useAtom(isModalNotifikasiAlert)
   const [dataProvinsi, setDataProvinsi] = useState(provinsi)
   const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
   const [dataCandidate, setDataCandidate] = useState<any>([])
   const [isProvinsi, setProvinsi] = useState<any>(null)
   const [isKabupaten, setKabupaten] = useState<any>(null)
   const [isCandidate, setCandidate] = useState<any>(null)
   const [isLink, setLink] = useState<any>(null)
   const [isBody, setBody] = useState({
      title: "",
      description: "",
      link: '',
      idCandidate: '',
      idProvinsi: '',
      idKabkot: '',
   });

   async function onProvinsi({ idProv }: { idProv: any }) {
      setProvinsi(idProv)
      setKabupaten(null)
      setCandidate(null)
      const dataDbKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
      const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(idProv), tingkat: 1 } })
      setDataKabupaten(dataDbKab)
      setDataCandidate(dataDbCan)
      setBody({
         ...isBody,
         idProvinsi: idProv
      })
   }

   async function onKabupaten({ idKab }: { idKab: any }) {
      setKabupaten(idKab)
      setCandidate(null)
      const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(isProvinsi), idKabkot: Number(idKab), tingkat: 2 } })
      setDataCandidate(dataDbCan)
      setBody({
         ...isBody,
         idKabkot: idKab
      })
   }

   function onConfirmation() {
      if (isBody.title == "" || isBody.description == "" || isLink == null || isProvinsi == null || isCandidate == null)
         return toast("Silahkan lengkapi form", { theme: "dark" });
      setOpenModal(true)
   }

   return (
      <>
         <ButtonBack />
         <Stack mt={30}>
            <Text fw={"bold"}>TAMBAH NOTIFIKASI</Text>
         </Stack>
         <Box pt={30}>
            <Group grow>
               <Select
                  placeholder="Pilih Provinsi"
                  data={dataProvinsi.map((pro: any) => ({
                     value: String(pro.id),
                     label: pro.name
                  }))}
                  required
                  label={"Provinsi"}
                  value={isProvinsi}
                  onChange={(val) => (
                     onProvinsi({ idProv: val })
                  )}
                  searchable
               />
               <Select
                  placeholder="Pilih Kabupaten/Kota"
                  data={dataKabupaten.map((kab: any) => ({
                     value: String(kab.id),
                     label: kab.name
                  }))}
                  label={"Kabupaten"}
                  value={isKabupaten}
                  onChange={(val) => (
                     onKabupaten({ idKab: val })
                  )}
               />
            </Group>
            <Select
               mt={20}
               placeholder="Pilih Kandidat"
               data={dataCandidate.map((can: any) => ({
                  value: String(can.id),
                  label: can.name
               }))}
               required
               value={isCandidate}
               label={"Kandidat"}
               searchable
               onChange={(val: any) => {
                  setCandidate(val)
                  setBody({
                     ...isBody,
                     idCandidate: val
                  })
               }}
            />
            <Group grow mt={20}>
               {/* <TextInput
                  placeholder="https://..."
                  withAsterisk
                  value={isBody.link}
                  label="Menu Tujuan"
                  onChange={(val) => {
                     setBody({
                        ...isBody,
                        link: val.target.value
                     })
                  }}
               /> */}
               <Select
                  placeholder="Pilih Menu Tujuan"
                  data={DataMenu.map((menu: any) => ({
                     value: String(menu.kategori),
                     label: menu.name
                  }))}
                  required
                  value={isLink}
                  label={"Menu Tujuan"}
                  onChange={(val: any) => {
                     setLink(val)
                     setBody({
                        ...isBody,
                        link: val
                     })
                  }}
               />
               <TextInput
                  placeholder="Judul Notifikasi"
                  withAsterisk
                  value={isBody.title}
                  label="Judul"
                  onChange={(val) => {
                     setBody({
                        ...isBody,
                        title: val.target.value
                     })
                  }} />

            </Group>
            <Textarea
               mt={20}
               label="Deskripsi"
               required
               placeholder="Deskripsi notifikasi"
               value={isBody.description}
               onChange={(val) => {
                  setBody({
                     ...isBody,
                     description: val.target.value
                  })
               }}
            />
            <Group justify="flex-end">
               <Button
                  bg={"gray"}
                  mt={30}
                  size="md"
                  onClick={onConfirmation}>
                  SIMPAN
               </Button>
            </Group>
         </Box>
         <Modal
            opened={openModal}
            onClose={() => setOpenModal(false)}
            centered
            withCloseButton={false}
            closeOnClickOutside={false}
         >
            <ModalAddNotifikasi data={isBody}
               onSuccess={() => {
                  setProvinsi(null)
                  setKabupaten(null)
                  setCandidate(null)
                  setLink(null)
                  setBody({
                     ...isBody,
                     title: '',
                     description: '',
                     link: '',
                     idCandidate: '',
                     idProvinsi: '',
                     idKabkot: ''
                  })
               }}
            />
         </Modal>
      </>
   );
}
