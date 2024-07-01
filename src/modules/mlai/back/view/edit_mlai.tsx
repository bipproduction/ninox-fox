'use client'
import { ButtonBack } from "@/modules/_global"
import { ActionIcon, Box, Button, Group, Modal, Select, Spoiler, Stack, Text, TextInput, Textarea } from "@mantine/core"
import { useAtom } from "jotai"
import { isModalMlAi } from "../val/val_mlai"
import ModalEditMlAi from "../component/modal_edit_mlai"
import { useRef, useState } from "react"
import { Link, RichTextEditor } from "@mantine/tiptap"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Superscript from "@tiptap/extension-superscript"
import Subscript from "@tiptap/extension-subscript"
import Highlight from "@tiptap/extension-highlight"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import TextAlign from "@tiptap/extension-text-align"
import { CiPickerEmpty } from "react-icons/ci"
import toast from "react-simple-toasts"
import { DateInput, TimeInput } from "@mantine/dates"
import { AiOutlineClockCircle } from "react-icons/ai"
import moment from "moment"

/**
 * Fungsi untuk menampilkan view form edit mlai.
 * @returns {component} view form edit mlai.
 */

export default function EditMlAi({ data }: { data: any }) {
    const ref = useRef<HTMLInputElement>(null)
    const [openModal, setOpenModal] = useAtom(isModalMlAi)
    const [isBody, setBody] = useState({
        id: data.id,
        idRequest: data.idRequestMlAi,
        idCandidate: data.idCandidate,
        content: data.content,
        dateContent: data.dateContent == null ? '' : data.dateContent,
        timeContent: data.timeContent == null ? '' : data.timeContent
    })

    const pickerControl = (
        <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
            <AiOutlineClockCircle style={{ width: "70%", height: "70%" }} />
        </ActionIcon>
    );

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            Subscript,
            Highlight,
            TextStyle,
            Color,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: data.content,
    });

    function onConfirmation() {
        if (Object.values(isBody).includes("") || editor?.getHTML() == '<p></p>')
            return toast("Form cannot be empty", { theme: "dark" });
        setOpenModal(true)
    }

    return (
        <>
            <ButtonBack />
            <Stack mt={30}>
                <Text fw={"bold"}>EDIT ML-AI</Text>
            </Stack>
            <Box pt={20}>
                {
                    data.idRequestMlAi != null && (
                        <>
                            <Box p={20} mb={20} bg={'#CED4D9'} style={{ borderRadius: 10 }}>
                                <Text mb={10} fw={'bold'} fz={20}>
                                    REQUEST
                                </Text>
                                <Spoiler maxHeight={50} showLabel={<Text c={'#787A7C'}>Show more</Text>} hideLabel={<Text c={'#787A7C'}>Hide</Text>}>
                                    <Text>
                                        {data.request}
                                    </Text>
                                </Spoiler>
                            </Box>
                        </>
                    )
                }

                <Stack>
                    <Group grow>
                        <TextInput label={"Provinsi"} value={data.areaProvinsi} disabled />
                        <TextInput label={"Kabupaten"} value={data.areaKabkot} disabled />
                    </Group>
                    <TextInput label={"Kandidat"} value={data.name} disabled />
                    <Group grow>
                        <DateInput valueFormat="DD-MM-YYYY" required
                            label={"Tanggal"}
                            placeholder="Pilih Tanggal"
                            value={(isBody.dateContent == '' || isBody.dateContent == null) ? null : new Date(isBody.dateContent)}
                            onChange={(e) => {
                                setBody({
                                    ...isBody,
                                    dateContent: moment(e).format("YYYY-MM-DD"),
                                });
                            }}
                        />
                        <TimeInput
                            label="Jam"
                            required ref={ref}
                            rightSection={pickerControl}
                            value={isBody.timeContent}
                            onChange={(val) =>
                                setBody({
                                    ...isBody,
                                    timeContent: String(val.target.value)
                                })
                            }
                        />
                    </Group>
                </Stack>
                {/* <Textarea
                    mt={20}
                    placeholder="Value Content"
                    label="Content"
                    withAsterisk
                    value={isBody.content}
                    onChange={(val) => {
                        setBody({
                            ...isBody,
                            content: val.target.value
                        })
                    }}
                /> */}
                <Box pt={30}>
                    <RichTextEditor editor={editor}>
                        <RichTextEditor.Toolbar sticky stickyOffset={60}>
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
                                <RichTextEditor.Code />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.Hr />
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                                <RichTextEditor.Subscript />
                                <RichTextEditor.Superscript />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignJustify />
                                <RichTextEditor.AlignRight />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ColorPicker
                                colors={[
                                    '#25262b',
                                    '#868e96',
                                    '#fa5252',
                                    '#e64980',
                                    '#be4bdb',
                                    '#7950f2',
                                    '#4c6ef5',
                                    '#228be6',
                                    '#15aabf',
                                    '#12b886',
                                    '#40c057',
                                    '#82c91e',
                                    '#fab005',
                                    '#fd7e14',
                                ]}
                            />

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Control interactive={false}>
                                    <CiPickerEmpty size="1rem" stroke={"1.5"} />
                                </RichTextEditor.Control>
                                <RichTextEditor.Color color="#F03E3E" />
                                <RichTextEditor.Color color="#7048E8" />
                                <RichTextEditor.Color color="#1098AD" />
                                <RichTextEditor.Color color="#37B24D" />
                                <RichTextEditor.Color color="#F59F00" />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.UnsetColor />
                        </RichTextEditor.Toolbar>

                        <RichTextEditor.Content />
                    </RichTextEditor>
                </Box>
                <Group justify="flex-end">
                    <Button bg={"gray"} mt={30} size="md" onClick={() => onConfirmation()}>SIMPAN</Button>
                </Group>
            </Box>
            <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
                centered
                withCloseButton={false}
                closeOnClickOutside={false}
            >
                <ModalEditMlAi data={isBody} content={editor?.getHTML()} />
            </Modal>
        </>
    )
}