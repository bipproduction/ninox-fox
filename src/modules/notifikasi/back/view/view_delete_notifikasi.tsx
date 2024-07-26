'use client'
import { Stack, Box, Paper, Select, Button, Text, Grid, Modal } from "@mantine/core"
import { useAtom } from "jotai"
import _ from "lodash"
import { isModalNotifikasiAlert } from "../val/isModalNotifikasiAlert"
import ModalDeleteNotifikasi from "../components/modal_delete_notifikasi"
import { useState } from "react"
import toast from "react-simple-toasts"

export default function ViewDeleteNotifikasi({ data }: { data: any }) {
   const [openModal, setOpenModal] = useAtom(isModalNotifikasiAlert);
   const [isUser, setUser] = useState<any>("")

   function onProccess1() {
      if (isUser == "" || isUser == null) {
         return toast("Silahkan pilih user", { theme: "dark" });
      }

      setOpenModal(true)
   }

   function onProccess2() {
      setUser("semua")
      setOpenModal(true)
   }

   return (
      <>
         <Stack>
            <Text fw={"bold"}>HAPUS NOTIFIKASI</Text>
         </Stack>
         <Box pt={30}>
            <Grid h={"100%"}>
               <Grid.Col span={6}>
                  <Box>
                     <Paper shadow="xs" p="xl">
                        <Text mb={10} fw={"bold"} fz={15}>HAPUS NOTIFIKASI BERDASARKAN USER</Text>
                        <Stack mt={10}>
                           <Select
                              placeholder="Pilih User"
                              data={data.map((pro: any) => ({
                                 value: String(pro.id),
                                 label: pro.name
                              }))}
                              value={(!_.isNull(isUser) ? String(isUser) : null)}
                              required
                              label={"User"}
                              searchable
                              onChange={(val) => setUser(val)}
                           />
                           <Button bg={"gray"}
                              onClick={() => onProccess1()}
                           >
                              SUBMIT
                           </Button>
                        </Stack>
                     </Paper>
                  </Box>
               </Grid.Col>
               <Grid.Col span={6}>
                  <Paper shadow="xs" p="xl" h={"100%"}>
                     <Text fw={"bold"} fz={15}>HAPUS SEMUA NOTIFIKASI</Text>
                     <Stack h={"100%"} justify="center" >
                        <Button bg={"gray"}
                           onClick={() => onProccess2()}
                        >
                           HAPUS
                        </Button>
                     </Stack>
                  </Paper>
               </Grid.Col>

            </Grid>
         </Box>
         <Modal
            size={"md"}
            opened={openModal}
            onClose={() => setOpenModal(false)}
            centered
            withCloseButton={false}
            closeOnClickOutside={false}
         >
            <ModalDeleteNotifikasi data={isUser} />
         </Modal>
      </>
   )
}