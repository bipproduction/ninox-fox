"use client"
import { MasterKabGetByProvince } from '@/modules/_global';
import { funGetCandidateActiveByArea } from '@/modules/candidate';
import { Box, Button, Modal, Paper, Select, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalPairing } from '../val/val_modal_pairing';
import ModalDeletePairing from '../components/modal/modal_delete_pairing';

export default function ViewDeletePairing({ param, provinsi, kabupaten, candidate }: { param: any, provinsi: any, kabupaten: any, candidate: any }) {
   const today = new Date();
   const [openModal, setOpenModal] = useAtom(isModalPairing);

   const [dataProvinsi, setDataProvinsi] = useState(provinsi)
   const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
   const [dataCandidate, setDataCandidate] = useState<any>(candidate)
   const [isProvinsi, setProvinsi] = useState<any>(param.idProvinsi || null)
   const [isKabupaten, setKabupaten] = useState<any>(param.idKabkot || null)
   const [isCandidate1, setCandidate1] = useState<any>(param.idCandidate1 || null)
   const [isCandidate2, setCandidate2] = useState<any>(param.idCandidate2 || null)
   const [isDate, setDate] = useState<any>((_.isNull(param.date)) ? today : new Date(param.date))


   useEffect(() => {
      setProvinsi((param.idProvinsi == 0) ? null : param.idProvinsi)
      setKabupaten((param.idKabkot == 0) ? null : param.idKabkot)
      setCandidate1((param.idCandidate1 == 0) ? null : param.idCandidate1)
      setCandidate2((param.idCandidate2 == 0) ? null : param.idCandidate2)
      setDate((param.date == null) ? new Date() : new Date(param.date))
   }, [param])

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
      if (_.isNull(isCandidate1)) return toast("Silahkan pilih kandidat 1", { theme: "dark" })
      if (_.isNull(isCandidate2)) return toast("Silahkan pilih kandidat 2", { theme: "dark" })
      setOpenModal(true)

   }
   return (
      <>
         <Stack>
            <Text fw={"bold"}>HAPUS DATA PASANGAN</Text>
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
                     placeholder="Pilih Kandidat 1"
                     data={dataCandidate.map((can: any) => ({
                        value: String(can.id),
                        label: can.name
                     }))}
                     required
                     value={isCandidate1}
                     label={"Kandidat 1"}
                     searchable
                     onChange={(val) => { 
                        setCandidate1(val) 
                        setCandidate2(null)
                     }}
                  />

                  <Select
                     placeholder="Pilih Kandidat 2"
                     data={dataCandidate.map((can: any) => ({
                        value: String(can.id),
                        label: can.name
                     }))}
                     required
                     value={isCandidate2}
                     label={"Kandidat 2"}
                     searchable
                     onChange={(val) => { setCandidate2(val) }}
                  />

                  <DateInput valueFormat="DD-MM-YYYY" required value={isDate}
                     label={"Select Date"} placeholder="SELECT DATE" onChange={(val) => { setDate(val) }} />
                  <Button bg={"gray"} onClick={() => onProccess()}>
                     PROSES
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
            <ModalDeletePairing isCandidate1={isCandidate1} isCandidate2={isCandidate2} isDateCan={isDate} onSuccess={() => {
               setDate(null)
            }} />
         </Modal>
      </>
   );
}
