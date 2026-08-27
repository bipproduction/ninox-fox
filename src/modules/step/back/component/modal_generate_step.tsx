"use client"
import { useAtom } from 'jotai';
import { useState } from 'react';
import { isModalGenerateStep } from '../val/val_step';
import toast from 'react-simple-toasts';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { funGetAccessArea } from '@/modules/_global';
import { funLogUser } from '@/modules/user';
import funGenerateDataStep from '../fun/generate_data_step';

export default function ModalGenerateStep({ candidates, provinsi, onSuccess }: { candidates: { id: string, name: string }[], provinsi: any, onSuccess: (val: any) => void }) {

   const [openModal, setOpenModal] = useAtom(isModalGenerateStep);
   const [isLoading, setLoading] = useState(false)

   async function genData() {
      setLoading(true)
      const cek = await funGetAccessArea({ provinsi })
      if (!cek) {
         setLoading(false)
         setOpenModal(false)
         return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
      }

      const result = await funGenerateDataStep({ candidates })
      await funLogUser({ act: 'ADD', desc: `User generate data Step (${candidates.length} kandidat, ${result.count} entry)`, idContent: '-', tbContent: 'step' })
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
                  ANDA YAKIN INGIN GENERATE DATA STEP UNTUK {candidates.length} KANDIDAT? SETIAP KANDIDAT AKAN MENDAPATKAN 8 ENTRY BARU (4 KATEGORI × POSITIF/NEGATIF) DENGAN KONTEN OTOMATIS.
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
