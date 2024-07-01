// 'use client'
// import { ButtonBack, MasterKabGetByProvince } from "@/modules/_global"
// import { ActionIcon, Box, Button, Group, Modal, Radio, Select, Stack, Text, TextInput, Textarea } from "@mantine/core"
// import ModalAddMlAi from "../component/modal_add_mlai"
// import { useAtom } from "jotai"
// import { isModalMlAi } from "../val/val_mlai"
// import { useEffect, useRef, useState } from "react"
// import _, { values } from "lodash"
// import toast from "react-simple-toasts"
// import { Link, RichTextEditor } from "@mantine/tiptap"
// import { CiPickerEmpty } from "react-icons/ci"
// import { useEditor } from "@tiptap/react"
// import Highlight from '@tiptap/extension-highlight';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import TextAlign from '@tiptap/extension-text-align';
// import Superscript from '@tiptap/extension-superscript';
// import SubScript from '@tiptap/extension-subscript';
// import { Color } from '@tiptap/extension-color';
// import TextStyle from '@tiptap/extension-text-style';
// import { funGetCandidateActiveByArea } from "@/modules/candidate"
// import { DateInput, TimeInput } from "@mantine/dates"
// import { AiOutlineClockCircle } from "react-icons/ai"
// import moment from "moment"

// /**
//  * Fungsi untuk menampilkan view form add mlai.
//  * @returns {component} view form add mlai.
//  */

// export default function AddMlAi({ params, candidate, provinsi, kabupaten }: { params: any, candidate: any, provinsi: any, kabupaten: any }) {
//    const ref = useRef<HTMLInputElement>(null);
//    const [openModal, setOpenModal] = useAtom(isModalMlAi)
//    const [isDataCandidate, setDataCandidate] = useState(candidate)
//    const [dataProvinsi, setDataProvinsi] = useState(provinsi)
//    const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
//    const [isProvinsi, setProvinsi] = useState<any>(null)
//    const [isKabupaten, setKabupaten] = useState<any>(null)
//    const [isDataMlai, setDataMlai] = useState({
//       idCandidate: '',
//       dateContent: '',
//       timeContent: ''
//    })

//    const pickerControl = (
//       <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
//          <AiOutlineClockCircle style={{ width: "70%", height: "70%" }} />
//       </ActionIcon>
//    );

//    async function onProvinsi({ idProv }: { idProv: any }) {
//       setProvinsi(idProv)
//       setKabupaten(null)
//       setDataMlai({
//          ...isDataMlai,
//          idCandidate: ''
//       })
//       const dataDbKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
//       const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(idProv), tingkat: 1 } })
//       setDataKabupaten(dataDbKab)
//       setDataCandidate(dataDbCan)
//    }

//    async function onKabupaten({ idKab }: { idKab: any }) {
//       setKabupaten(idKab)
//       setDataMlai({
//          ...isDataMlai,
//          idCandidate: ''
//       })
//       const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(isProvinsi), idKabkot: Number(idKab), tingkat: 2 } })
//       setDataCandidate(dataDbCan)
//    }

//    const editor = useEditor({
//       extensions: [
//          StarterKit,
//          Underline,
//          Link,
//          Superscript,
//          SubScript,
//          Highlight,
//          TextStyle,
//          Color,
//          TextAlign.configure({ types: ['heading', 'paragraph'] }),
//       ],
//       content: "",
//    });

//    function onConfirmation() {
//       if (Object.values(isDataMlai).includes("") || editor?.getHTML() == '<p></p>')
//          return toast("Form cannot be empty", { theme: "dark" });
//       setOpenModal(true)
//    }
//    useEffect(() => {
//       // setProvinsi((params.idProvinsi == 0) ? null : params.idProvinsi)
//       // setKabupaten((params.idKabkot == 0) ? null : params.idKabkot)
//       // setCandidate((params.idCandidate == 0) ? null : params.idCandidate)
//    }, [params])

//    return (
//       <>
//          <ButtonBack />
//          <Stack mt={30}>
//             <Text fw={"bold"}>TAMBAH ML-AI</Text>
//          </Stack>
//          <Box pt={30}>
//             <Group grow>
//                <Select
//                   placeholder="Pilih Provinsi"
//                   data={dataProvinsi.map((pro: any) => ({
//                      value: String(pro.id),
//                      label: pro.name
//                   }))}
//                   required
//                   label={"Provinsi"}
//                   value={isProvinsi}
//                   onChange={(val) => (
//                      onProvinsi({ idProv: val })
//                   )}
//                   searchable
//                />
//                <Select
//                   placeholder="Pilih Kabupaten/Kota"
//                   data={dataKabupaten.map((kab: any) => ({
//                      value: String(kab.id),
//                      label: kab.name
//                   }))}
//                   label={"Kabupaten"}
//                   value={isKabupaten}
//                   onChange={(val) => (
//                      onKabupaten({ idKab: val })
//                   )}
//                />
//             </Group>
//             <Select
//                placeholder="Pilih Kandidat"
//                data={isDataCandidate.map((can: any) => ({
//                   value: String(can.id),
//                   label: can.name
//                }))}
//                required
//                value={isDataMlai.idCandidate == '' ? null : isDataMlai.idCandidate}
//                label={"Kandidat"}
//                searchable
//                onChange={(val: any) => {
//                   setDataMlai({
//                      ...isDataMlai,
//                      idCandidate: val == null ? '' : val
//                   })
//                }}
//             />
//             <Group grow>
//                <DateInput valueFormat="DD-MM-YYYY" required
//                   label={"Tanggal"}
//                   placeholder="Pilih Tanggal"
//                   value={(isDataMlai.dateContent == '') ? null : new Date(isDataMlai.dateContent)}
//                   onChange={(e) => {
//                      setDataMlai({
//                         ...isDataMlai,
//                         dateContent: moment(e).format("YYYY-MM-DD"),
//                      });
//                   }}
//                />
//                <TimeInput
//                   label="Jam"
//                   required ref={ref}
//                   rightSection={pickerControl}
//                   value={isDataMlai.timeContent}
//                   onChange={(val) =>
//                      setDataMlai({
//                         ...isDataMlai,
//                         timeContent: String(val.target.value)
//                      })
//                   }
//                />
//             </Group>
//             <Box pt={30}>
//                <RichTextEditor editor={editor}>
//                   <RichTextEditor.Toolbar sticky stickyOffset={60}>
//                      <RichTextEditor.ControlsGroup>
//                         <RichTextEditor.Bold />
//                         <RichTextEditor.Italic />
//                         <RichTextEditor.Underline />
//                         <RichTextEditor.Strikethrough />
//                         <RichTextEditor.ClearFormatting />
//                         <RichTextEditor.Highlight />
//                         <RichTextEditor.Code />
//                      </RichTextEditor.ControlsGroup>

//                      <RichTextEditor.ControlsGroup>
//                         <RichTextEditor.H1 />
//                         <RichTextEditor.H2 />
//                         <RichTextEditor.H3 />
//                         <RichTextEditor.H4 />
//                      </RichTextEditor.ControlsGroup>

//                      <RichTextEditor.ControlsGroup>
//                         <RichTextEditor.Blockquote />
//                         <RichTextEditor.Hr />
//                         <RichTextEditor.BulletList />
//                         <RichTextEditor.OrderedList />
//                         <RichTextEditor.Subscript />
//                         <RichTextEditor.Superscript />
//                      </RichTextEditor.ControlsGroup>

//                      <RichTextEditor.ControlsGroup>
//                         <RichTextEditor.Link />
//                         <RichTextEditor.Unlink />
//                      </RichTextEditor.ControlsGroup>

//                      <RichTextEditor.ControlsGroup>
//                         <RichTextEditor.AlignLeft />
//                         <RichTextEditor.AlignCenter />
//                         <RichTextEditor.AlignJustify />
//                         <RichTextEditor.AlignRight />
//                      </RichTextEditor.ControlsGroup>

//                      <RichTextEditor.ColorPicker
//                         colors={[
//                            '#25262b',
//                            '#868e96',
//                            '#fa5252',
//                            '#e64980',
//                            '#be4bdb',
//                            '#7950f2',
//                            '#4c6ef5',
//                            '#228be6',
//                            '#15aabf',
//                            '#12b886',
//                            '#40c057',
//                            '#82c91e',
//                            '#fab005',
//                            '#fd7e14',
//                         ]}
//                      />

//                      <RichTextEditor.ControlsGroup>
//                         <RichTextEditor.Control interactive={false}>
//                            <CiPickerEmpty size="1rem" stroke={"1.5"} />
//                         </RichTextEditor.Control>
//                         <RichTextEditor.Color color="#F03E3E" />
//                         <RichTextEditor.Color color="#7048E8" />
//                         <RichTextEditor.Color color="#1098AD" />
//                         <RichTextEditor.Color color="#37B24D" />
//                         <RichTextEditor.Color color="#F59F00" />
//                      </RichTextEditor.ControlsGroup>

//                      <RichTextEditor.UnsetColor />
//                   </RichTextEditor.Toolbar>

//                   <RichTextEditor.Content />
//                </RichTextEditor>
//             </Box>
//             <Group justify="flex-end">
//                <Button bg={"gray"} mt={30} size="md" onClick={onConfirmation}>SAVE</Button>
//             </Group>
//          </Box>
//          <Modal
//             opened={openModal}
//             onClose={() => setOpenModal(false)}
//             centered
//             withCloseButton={false}
//             closeOnClickOutside={false}
//          >
//             <ModalAddMlAi text={editor?.getHTML()} data={isDataMlai}
//                onSuccess={() => {
//                   editor?.commands.setContent('<p></p>')
//                   setProvinsi(null)
//                   setKabupaten(null)
//                   setDataMlai({
//                      ...isDataMlai,
//                      idCandidate: '',
//                      dateContent: '',
//                      timeContent: '',
//                   })
//                }}
//             />
//          </Modal>
//       </>
//    )
// }