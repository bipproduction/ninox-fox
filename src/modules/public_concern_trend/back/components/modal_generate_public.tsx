"use client"
import { useAtom } from 'jotai';
import { useState } from 'react';
import toast from 'react-simple-toasts';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { funGetAccessArea } from '@/modules/_global';
import { funLogUser } from '@/modules/user';
import { isModalGeneratePct } from '../val/val_public';
import funGenerateDataPct from '../fun/generate_data_pct';

export default function ModalGeneratePct({ scope, wilayah, filled, onSuccess }: { scope: { idProvinsi: number, idKabkot?: number, idKecamatan?: number }, wilayah: string, filled: number, onSuccess: (val: any) => void }) {

   const [openModal, setOpenModal] = useAtom(isModalGeneratePct);
   const [isLoading, setLoading] = useState(false)

   async function genData() {
      setLoading(true)
      const cek = await funGetAccessArea({ provinsi: scope.idProvinsi })
      if (!cek) {
         setLoading(false)
         setOpenModal(false)
         return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
      }

      const result = await funGenerateDataPct(scope)
      await funLogUser({ act: 'ADD', desc: `User generate data TREN PERHATIAN PUBLIK wilayah ${wilayah} (${result.count} baris)`, idContent: '-', tbContent: 'publicConcernTrendFix' })
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
                  ANDA YAKIN INGIN GENERATE DATA TREN PERHATIAN PUBLIK UNTUK WILAYAH {wilayah}? NILAI SETIAP KATEGORI AKAN DIBUAT OTOMATIS SECARA ACAK.
               </Text>
               {filled > 0 &&
                  <Text c={"red"} fw={700} ta={"center"} mb={20}>
                     PERHATIAN: {filled} DATA YANG SUDAH TERISI AKAN DITIMPA.
                  </Text>
               }
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
