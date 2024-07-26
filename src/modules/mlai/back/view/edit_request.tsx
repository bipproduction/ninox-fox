'use client'
import { ButtonBack } from "@/modules/_global";
import { Stack, Box, Spoiler, Group, TextInput, Select, Button, Modal, Text, ActionIcon, Textarea } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useRef, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import moment from "moment";
import toast from "react-simple-toasts";
import ModalEditRequest from "../component/modal_edit_request";
import { useAtom } from "jotai";
import { isModalMlAi } from "../val/val_mlai";

export default function EditRequest({ data }: { data: any }) {
   const ref = useRef<HTMLInputElement>(null);
   const [openModal, setOpenModal] = useAtom(isModalMlAi)
   const [isBody, setBody] = useState({
      id: data.id,
      request: data.request,
      date: data.date == null ? '' : data.date,
      time: data.time == null ? '' : data.time
   })

   const pickerControl = (
      <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
         <AiOutlineClockCircle style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
   );

   function onConfirmation() {
      if (Object.values(isBody).includes("") || Object.values(isBody).includes(null))
         return toast("Form cannot be empty", { theme: "dark" });
      setOpenModal(true)
   }

   return (
      <>
         <ButtonBack />
         <Stack mt={30}>
            <Text fw={"bold"}>Edit Request</Text>
         </Stack>
         <Box pt={30}>
            <Group grow>
               <DateInput valueFormat="DD-MM-YYYY"
                  label={"Tanggal"}
                  placeholder="Pilih Tanggal"
                  value={(isBody.date == '') ? null : new Date(isBody.date)}
                  onChange={(e) => {
                     setBody({
                        ...isBody,
                        date: moment(e).format("YYYY-MM-DD"),
                     });
                  }}
               />
               <TimeInput
                  label="Jam"
                  ref={ref}
                  rightSection={pickerControl}
                  value={isBody.time}
                  onChange={(val) =>
                     setBody({
                        ...isBody,
                        time: String(val.target.value)
                     })
                  }
               />
            </Group>
            <Box pt={30}>
               <Textarea
                  size="md"
                  radius="md"
                  label="Request"
                  value={isBody.request}
                  onChange={(val) => {
                     setBody({
                        ...isBody,
                        request: val.target.value
                     })
                  }}
               />
            </Box>
            <Group justify="flex-end">
               <Button bg={"gray"} mt={30} size="md"
                  onClick={onConfirmation}
               >
                  SIMPAN
               </Button>
            </Group>
         </Box>
         <Modal
            opened={openModal}
            onClose={() => setOpenModal(false)}
            centered
            withCloseButton={false}
            closeOnClickOutside={false}
         >
            <ModalEditRequest data={isBody}/>
         </Modal>
      </>
   )
}