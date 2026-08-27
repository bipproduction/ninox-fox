"use client"
import { useAtom } from 'jotai';
import { useState } from 'react';
import { isModalGenerateCandidate } from '../val/isModalCandidate';
import toast from 'react-simple-toasts';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { funGetAccessArea } from '@/modules/_global';
import { funLogUser } from '@/modules/user';
import funGenerateDataCandidate from '../fun/generate_data_candidate';

export default function ModalGenerateCandidate({ idProvinsi, idKabkot, tingkat, count, onSuccess }: { idProvinsi: number, idKabkot: number | null, tingkat: number, count: number, onSuccess: (val: any) => void }) {

   const [openModal, setOpenModal] = useAtom(isModalGenerateCandidate);
   const [isLoading, setLoading] = useState(false)

   async function genData() {
      setLoading(true)
      const cek = await funGetAccessArea({ provinsi: idProvinsi })
      if (!cek) {
         setLoading(false)
         setOpenModal(false)
         return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
      }

      const result = await funGenerateDataCandidate({ idProvinsi, idKabkot, tingkat, count })
      await funLogUser({ act: 'ADD', desc: `User generate data Kandidat (${result.candidates.length} kandidat, ${result.pairsCreated} pasangan)`, idContent: '-', tbContent: 'candidate' })
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
                  ANDA YAKIN INGIN GENERATE {count} KANDIDAT BARU? KANDIDAT AKAN DIPASANGKAN OTOMATIS SECARA BERURUTAN DAN LANGSUNG MENDAPATKAN DATA SENTIMEN PASANGAN UNTUK HARI INI.
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
