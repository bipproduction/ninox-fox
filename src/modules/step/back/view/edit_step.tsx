'use client'
import { ButtonBack } from "@/modules/_global"
import { Box, Button, Group, Modal, Radio, Select, Stack, Text, TextInput, Textarea } from "@mantine/core"
import { useAtom } from "jotai"
import { isModalStep } from "../val/val_step"
import ModalEditStep from "../component/modal_edit_step"
import { useState } from "react"
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

/**
 * Fungsi untuk menampilkan view form edit step.
 * @returns {component} view form edit step.
 */

export default function EditStep({ data }: { data: any }) {
    const [openModal, setOpenModal] = useAtom(isModalStep)
    const [isBody, setBody] = useState({
        id: data.id,
        idCandidate: data.idCandidate,
        category: data.category,
        content: data.content,
        sentiment: String(data.sentiment)
    })

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
        if (Object.values(isBody).includes("") || Object.values(isBody).includes(null) || editor?.getHTML() == '<p></p>')
            return toast("Form cannot be empty", { theme: "dark" });
        setOpenModal(true)
    }

    return (
        <>
            <ButtonBack />
            <Stack mt={30}>
                <Text fw={"bold"}>EDIT STEP</Text>
            </Stack>
            <Box pt={30}>
                <Stack>
                    <Group grow>
                        <TextInput label={"Provinsi"} value={data.areaProvinsi} disabled />
                        <TextInput label={"Kabupaten"} value={data.areaKabkot} disabled />
                    </Group>
                    <TextInput label={"Kandidat"} value={data.name} disabled />
                </Stack>
                <Select mt={20}
                    placeholder="Pilih Kategori"
                    withAsterisk
                    label="Kategori"
                    data={["SOSIAL", "TEKNOLOGI", "EKONOMI", "POLITIK"]}
                    value={isBody.category}
                    onChange={(val) => {
                        setBody({
                            ...isBody,
                            category: val
                        })
                    }}
                />
                <Radio.Group mt={20} label={"Sentiment"} required value={isBody.sentiment} onChange={(val: any) => {
                    setBody({
                        ...isBody,
                        sentiment: val
                    })
                }}>
                    <Group mt="xs">
                        <Radio value="1" label="Positive" />
                        <Radio value="2" label="Negative" />
                    </Group>
                </Radio.Group>
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
                <ModalEditStep data={isBody} content={editor?.getHTML()} />
            </Modal>
        </>
    )
}