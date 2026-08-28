"use client"
import { useAtom } from 'jotai';
import { useState } from 'react';
import toast from 'react-simple-toasts';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { funGetAccessArea } from '@/modules/_global';
import { funLogUser } from '@/modules/user';
import { isModalGenerateSe } from '../val/val_se';
import funGenerateDataSosialEkonomi from '../fun/generate_data_se';

export default function ModalGenerateSe({ scope, wilayah, filled, onSuccess }: { scope: { idProvinsi: number, idKabkot?: number, idKecamatan?: number }, wilayah: string, filled: number, onSuccess: (val: any) => void }) {

   const [openModal, setOpenModal] = useAtom(isModalGenerateSe);
   const [isLoading, setLoading] = useState(false)

   async function genData() {
      setLoading(true)
      const cek = await funGetAccessArea({ provinsi: scope.idProvinsi })
      if (!cek) {
         setLoading(false)
         setOpenModal(false)
         return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
      }

      const result = await funGenerateDataSosialEkonomi(scope)
      await funLogUser({ act: 'ADD', desc: `User generate DATA SOSIAL EKONOMI wilayah ${wilayah} (${result.tables} tabel, ${result.rows} baris)`, idContent: '-', tbContent: 'sosialEkonomi' })
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
                  ANDA YAKIN INGIN GENERATE SELURUH DATA SOSIAL EKONOMI UNTUK WILAYAH {wilayah}? NILAI SETIAP KATEGORI AKAN DIBUAT OTOMATIS SECARA ACAK.
               </Text>
               {filled > 0 &&
                  <Text c={"red"} fw={700} ta={"center"} mb={20}>
                     PERHATIAN: DATA YANG SUDAH TERISI PADA WILAYAH INI AKAN DITIMPA.
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
