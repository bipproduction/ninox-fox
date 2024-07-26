'use client'
import { funGetAccessArea } from "@/modules/_global"
import { funLogUser } from "@/modules/user"
import { Box, Alert, Grid, Button, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { useState } from "react"
import toast from "react-simple-toasts"
import funAddNotificationsBack from "../fun/fun_add_notifikasi_back"
import { isModalNotifikasiAlert } from "../val/isModalNotifikasiAlert"
import funDeleteNotifikasi from "../fun/fun_delete_notifikasi"

export default function ModalDeleteNotifikasi({ data }: { data: any }) {
   const [openModal, setOpenModal] = useAtom(isModalNotifikasiAlert)
   const [isLoading, setLoading] = useState(false)

   async function onCreateCandidate() {
      setLoading(true)

      const del = await funDeleteNotifikasi({ id: data })
      if (del.success) {
         if (data == "semua") {
            await funLogUser({ act: 'DEL', desc: `User menghapus semua data notifikasi`, idContent: '', tbContent: 'notifikasi' })
         } else {
            await funLogUser({ act: 'DEL', desc: `User menghapus notifikasi (user=${data})`, idContent: '', tbContent: 'notifikasi' })
         }

      }

      toast(del.message, { theme: "dark" });
      setOpenModal(false);
      setLoading(false)
   }

   return (
      <>
         <Box>
            <Alert color="gray" variant="outline">
               <Text fw={700} ta={"center"} mb={20} mt={20}>
                  ANDA YAKIN INGIN MENGHAPUS {(data == "semua") ? "SEMUA" : ''} NOTIFIKASI?
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