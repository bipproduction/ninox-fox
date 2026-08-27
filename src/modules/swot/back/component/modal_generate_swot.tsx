"use client"
import { useAtom } from 'jotai';
import { useState } from 'react';
import { isModalGenerateSwot } from '../val/val_swot';
import toast from 'react-simple-toasts';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { funGetAccessArea } from '@/modules/_global';
import { funLogUser } from '@/modules/user';
import funGenerateDataSwot from '../fun/generate_data_swot';

export default function ModalGenerateSwot({ candidates, provinsi, onSuccess }: { candidates: { id: string, name: string }[], provinsi: any, onSuccess: (val: any) => void }) {

   const [openModal, setOpenModal] = useAtom(isModalGenerateSwot);
   const [isLoading, setLoading] = useState(false)

   async function genData() {
      setLoading(true)
      const cek = await funGetAccessArea({ provinsi })
      if (!cek) {
         setLoading(false)
         setOpenModal(false)
         return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
      }

      const result = await funGenerateDataSwot({ candidates })
      await funLogUser({ act: 'ADD', desc: `User generate data SWOT (${candidates.length} kandidat, ${result.count} entry)`, idContent: '-', tbContent: 'swot' })
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
                  ANDA YAKIN INGIN GENERATE DATA SWOT UNTUK {candidates.length} KANDIDAT? SETIAP KANDIDAT AKAN MENDAPATKAN 4 ENTRY BARU (STRENGTH/WEAKNESS/OPPORTUNITY/THREAT) DENGAN KONTEN OTOMATIS.
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
