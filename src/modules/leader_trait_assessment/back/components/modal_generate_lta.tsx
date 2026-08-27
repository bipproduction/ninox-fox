"use client"
import { useAtom } from 'jotai';
import { useState } from 'react';
import { isModalGenerateLta } from '../val/val_lta';
import toast from 'react-simple-toasts';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { funGetAccessArea } from '@/modules/_global';
import { funLogUser } from '@/modules/user';
import funGenerateDataLta from '../fun/generate_data_lta';

export default function ModalGenerateLta({ idProvinsi, idKabkot, idKecamatan, count, onSuccess }: { idProvinsi: number, idKabkot?: number | null, idKecamatan?: number | null, count: number, onSuccess: (val: any) => void }) {

   const [openModal, setOpenModal] = useAtom(isModalGenerateLta);
   const [isLoading, setLoading] = useState(false)

   async function genData() {
      setLoading(true)
      const cek = await funGetAccessArea({ provinsi: idProvinsi })
      if (!cek) {
         setLoading(false)
         setOpenModal(false)
         return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
      }

      await funGenerateDataLta({ idProvinsi, idKabkot, idKecamatan })
      await funLogUser({ act: 'ADD', desc: `User generate data Penilaian Sifat Pemimpin (${count} kelurahan)`, idContent: '-', tbContent: 'lta' })
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
                  ANDA YAKIN INGIN GENERATE ULANG DATA PENILAIAN SIFAT PEMIMPIN UNTUK {count} KELURAHAN? NILAI SETIAP KATEGORI SIFAT AKAN DIBUAT OTOMATIS SECARA ACAK.
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
