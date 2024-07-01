'use client'
import { Alert, Box, Button, Grid, Text } from "@mantine/core"
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";
import { funGetAccessArea } from "@/modules/_global";
import { funLogUser } from "@/modules/user";
import { isModalNotifikasiAlert } from "../val/isModalNotifikasiAlert";
import funAddNotificationsBack from "../fun/fun_add_notifikasi_back";
import { useState } from "react";

/**
 * Fungsi untuk menampilkan modal konfirmasi add notifikasi.
 * @returns {component} Modal konfirmasi add notifikasi.
 */

export default function ModalAddNotifikasi({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
   const [openModal, setOpenModal] = useAtom(isModalNotifikasiAlert)
   const router = useRouter()
   const [isLoading, setLoading] = useState(false)

   async function onCreateCandidate() {
      setLoading(true)
      const cek = await funGetAccessArea({ provinsi: data.idProvinsi })
      if (!cek) {
         setOpenModal(false)
         setLoading(false)
         return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
      }
      const create = await funAddNotificationsBack({ body: data })
      if (!create.success)
         toast('Error', { theme: "dark" });
      await funLogUser({ act: 'ADD', desc: `User menambah data notifikasi`, idContent: '', tbContent: 'notifikasi' })
      setOpenModal(false);
      onSuccess(true)
      setLoading(false)
   }

   return (
      <>
         <Box>
            <Alert color="gray" variant="outline">
               <Text fw={700} ta={"center"} mb={20} mt={20}>
                  ANDA YAKIN INGIN MENAMBAHKAN NOTIFIKASI?
               </Text>
               <Grid>
                  <Grid.Col span={6}>
                     <Button
                        radius={10}
                        color="gray.7"
                        fullWidth
                        onClick={() => setOpenModal(false)}
                     >
                        TIDAK
                     </Button>
                  </Grid.Col>
                  <Grid.Col span={6}>
                     <Button
                        radius={10}
                        color="gray.7"
                        fullWidth
                        loading={isLoading}
                        onClick={() => onCreateCandidate()}
                     >
                        YA
                     </Button>
                  </Grid.Col>
               </Grid>
            </Alert>
         </Box>
      </>
   )
}