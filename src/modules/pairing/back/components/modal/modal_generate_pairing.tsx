"use client"
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { isModalGeneratePairing } from '../../val/val_modal_pairing';
import toast from 'react-simple-toasts';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { funGetAccessArea } from '@/modules/_global';
import { funLogUser } from '@/modules/user';
import moment from 'moment';
import funGenerateDataPairing from '../../fun/generate_data_pairing';

export default function ModalGeneratePairing({ pairs, dates, provinsi, onSuccess }: { pairs: { c1: string, c2: string }[], dates: string[], provinsi: any, onSuccess: (val: any) => void }) {

   const [openModal, setOpenModal] = useAtom(isModalGeneratePairing);
   const [isLoading, setLoading] = useState(false)

   async function genData() {
      setLoading(true)
      const cek = await funGetAccessArea({ provinsi })
      if (!cek) {
         setLoading(false)
         setOpenModal(false)
         return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
      }

      await funGenerateDataPairing({ pairs, dates })
      await funLogUser({ act: 'ADD', desc: `User generate data pairing (${pairs.length} pasangan kandidat, ${dates.length} tanggal, ${moment(dates[0]).format('DD/MM/YYYY')} - ${moment(dates[dates.length - 1]).format('DD/MM/YYYY')})`, idContent: '-', tbContent: 'pairing' })
      setLoading(false)
      onSuccess(true)
      toast("Success", { theme: "dark" });
      setOpenModal(false)
   }

   return (
      <>
         <Box>
            <Alert color="gray" variant="outline">
               <Text fw={700} ta={"center"} mb={20} mt={20}>
                  ANDA YAKIN INGIN GENERATE DATA UNTUK {pairs.length} PASANGAN KANDIDAT × {dates.length} TANGGAL? NILAI SENTIMEN AKAN DIBUAT OTOMATIS SECARA ACAK & BERBEDA TIAP TANGGAL.
               </Text>
               <Group justify="space-between" pt={10}>
                  <Button
                     radius={10}
                     color="gray.7"
                     w={150}
                     onClick={() => setOpenModal(false)}
                  >
                     TIDAK
                  </Button>
                  <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => genData()}>
                     YA
                  </Button>
               </Group>
            </Alert>
         </Box>
      </>
   );
}
