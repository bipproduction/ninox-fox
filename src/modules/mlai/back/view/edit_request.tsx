'use client'
import { ButtonBack } from "@/modules/_global";
import { Stack, Box, Spoiler, Group, TextInput, Select, Button, Modal, Text, ActionIcon, Textarea } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { RichTextEditor } from "@mantine/tiptap";
import router from "next/router";
import { CiPickerEmpty } from "react-icons/ci";
import ModalAddMlAi from "../component/modal_add_mlai";
import { useRef } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

export default function EditRequest({ data }: { data: any }) {
   const ref = useRef<HTMLInputElement>(null);
   const pickerControl = (
      <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
         <AiOutlineClockCircle style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
   );

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
               // value={(isDataMlai.dateContent == '') ? null : new Date(isDataMlai.dateContent)}
               // onChange={(e) => {
               //    setDataMlai({
               //       ...isDataMlai,
               //       dateContent: moment(e).format("YYYY-MM-DD"),
               //    });
               // }}
               />
               <TimeInput
                  label="Jam"
                  ref={ref}
                  rightSection={pickerControl}
               // value={isDataMlai.timeContent}
               // onChange={(val) =>
               //    setDataMlai({
               //       ...isDataMlai,
               //       timeContent: String(val.target.value)
               //    })
               // }
               />
            </Group>
            <Box pt={30}>
               <Textarea
                  size="md"
                  radius="md"
                  label="Request"
               />
            </Box>
            <Group justify="flex-end">
               <Button bg={"gray"} mt={30} size="md"
                  // onClick={onConfirmation}
               >
                  SIMPAN
               </Button>
            </Group>
         </Box>
         {/* <Modal
            opened={openModal}
            onClose={() => setOpenModal(false)}
            centered
            withCloseButton={false}
            closeOnClickOutside={false}
         >
            <ModalAddMlAi text={editor?.getHTML()} data={isDataMlai}
               onSuccess={() => {
                  if (req.id != null)
                     return router.push('/dashboard/ml-ai/request')
                  editor?.commands.setContent('<p></p>')
                  // setProvinsi(null)
                  // setKabupaten(null)
                  setDataMlai({
                     ...isDataMlai,
                     idRequest: null,
                     idCandidate: '',
                     dateContent: '',
                     timeContent: '',
                  })
               }}
            />
         </Modal> */}
      </>
   )
}