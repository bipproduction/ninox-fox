"use client"
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { isModalEmotion } from '../../val/val_emotion';
import toast from 'react-simple-toasts';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { funGetAccessArea } from '@/modules/_global';
import { funLogUser } from '@/modules/user';
import moment from 'moment';
import funSettingDataEmotion from '../../fun/setting_data_emotion';

export default function ModalSettingEmotion({ isCandidate, isDateCan, positif, netral, negatif, onSuccess }: { isCandidate: any, isDateCan: any, positif: number, netral: number, negatif: number, onSuccess: (val: any) => void }) {

   const [openModal, setOpenModal] = useAtom(isModalEmotion);
   const [isLoading, setLoading] = useState(false)

   async function delDataCan() {
      setLoading(true)
      const cek = await funGetAccessArea({ candidate: isCandidate })
      if (!cek) {
         setOpenModal(false)
         return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
      }

      await funSettingDataEmotion({ candidate: isCandidate, date: isDateCan, positif: positif, netral: netral, negatif: negatif })
      await funLogUser({ act: 'ADD', desc: `User setting data sentimen (${isCandidate} - ${moment(isDateCan).format('DD/MM/YYYY')})`, idContent: '-', tbContent: 'emotion' })
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
                  ANDA YAKIN INGIN MELAKUKAN SETTING DATA EMOSI KANDIDAT?
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
                  <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => delDataCan()}>
                     YA
                  </Button>
               </Group>
            </Alert>
         </Box>
      </>
   );
}

