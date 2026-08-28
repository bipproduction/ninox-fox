"use client"
import { useAtom } from 'jotai';
import { useState } from 'react';
import { isModalGenerateMlAi } from '../val/val_mlai';
import toast from 'react-simple-toasts';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { funGetAccessArea } from '@/modules/_global';
import { funLogUser } from '@/modules/user';
import moment from 'moment';
import funGenerateMlAi from '../fun/generate_mlai';

export default function ModalGenerateMlAi({ candidates, dates, provinsi, onSuccess }: { candidates: string[], dates: string[], provinsi: any, onSuccess: (val: any) => void }) {
   const [openModal, setOpenModal] = useAtom(isModalGenerateMlAi);
   const [isLoading, setLoading] = useState(false)

   async function genData() {
      setLoading(true)
      const cek = await funGetAccessArea({ provinsi })
      if (!cek) {
         setLoading(false)
         setOpenModal(false)
         return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
      }

      await funGenerateMlAi({ candidates, dates })
      await funLogUser({ act: 'ADD', desc: `User generate data ML-AI (${candidates.length} kandidat, ${dates.length} tanggal, ${moment(dates[0]).format('DD/MM/YYYY')} - ${moment(dates[dates.length - 1]).format('DD/MM/YYYY')})`, idContent: '-', tbContent: 'mlAi' })
      setLoading(false)
      onSuccess(true)
      toast("Success", { theme: "dark" });
      setOpenModal(false)
   }

   return (
      <Box>
         <Alert color="gray" variant="outline">
            <Text fw={700} ta={"center"} mb={20} mt={20}>
               ANDA YAKIN INGIN GENERATE DATA ML-AI UNTUK {candidates.length} KANDIDAT × {dates.length} TANGGAL (JAM 01:00)? KONTEN AKAN DIBUAT OTOMATIS DAN DATA LAMA PADA KOMBINASI YANG SAMA AKAN DIGANTI.
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
   );
}
