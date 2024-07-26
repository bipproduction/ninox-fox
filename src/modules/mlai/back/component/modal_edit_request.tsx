'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { isModalMlAi } from "../val/val_mlai"
import toast from "react-simple-toasts"
import { funLogUser } from "@/modules/user"
import { useState } from "react"
import funEditRequest from "../fun/fun_edit_request"

/**
 * Fungsi untuk menampilkan modal konfirmasi edit ml ai.
 * @returns {component} modal konfirmasi edit ml ai.
 */

export default function ModalEditRequest({ data }: { data: any }) {
   const [openModal, setOpenModal] = useAtom(isModalMlAi)
   const [isLoading, setLoading] = useState(false)

   async function onEditMlAi() {
      setLoading(true)
      const edit = await funEditRequest({ body: data })
      if (edit.success) {
         await funLogUser({ act: 'UPD', desc: `User mengubah data Request`, idContent: data.id, tbContent: 'request' })
      }
      toast(edit.message, { theme: "dark" });
      setOpenModal(false);
      setLoading(false)
   }

   return (
      <>
         <Box>
            <Alert color="gray" variant="outline">
               <Text fw={700} ta={"center"} mb={20} mt={20}>
                  ANDA YAKIN INGIN MENGEDIT REQUEST INI?
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
                  <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => onEditMlAi()}>
                     YA
                  </Button>
               </Group>
            </Alert>
         </Box>
      </>
   )
}