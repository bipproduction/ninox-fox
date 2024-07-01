"use client"
import { ButtonBack } from '@/modules/_global';
import { Box, Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import Subscript from "@tiptap/extension-subscript"
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { CiPickerEmpty } from 'react-icons/ci';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalRhi } from '../val/val_rhi';
import ModalEditRhi from '../components/modal_edit_rhi';

export default function ViewEditAdminMlai({ data }: { data: any }) {
    const [openModal, setOpenModal] = useAtom(isModalRhi)
    const [isId, setId] = useState(data.id)
    const [dataProvinsi, setDataProvinsi] = useState(data.idProvinsi)

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
        content: data.description,
    });

    function onConfirmation() {
        if (editor?.getHTML() == '<p></p>' || editor?.getHTML() == '')
            return toast("Data cannot be empty", { theme: "dark" });
        setOpenModal(true)
    }

    return (
        <>
            <ButtonBack />
            <Stack mt={30}>
                <Text fw={"bold"}>EDIT ISU WILAYAH</Text>
            </Stack>
            <Box pt={30}>
                <Stack>
                    <Group grow>
                        <TextInput label={"Provinsi"} value={data.areaProvinsi} disabled />
                        <TextInput label={"Kabupaten"} value={data.areaKabkot} disabled />
                    </Group>
                    <Group grow>
                        <TextInput label={"Kecamatan"} value={data.areaKecamatan} disabled />
                        <TextInput label={"Kelurahan"} value={data.areaKelurahan} disabled />
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
                <ModalEditRhi provinsi={dataProvinsi} dataId={isId} content={editor?.getHTML()} />
            </Modal>
        </>
    )
}
