'use client'
import { ButtonBack, MasterKabGetByProvince } from "@/modules/_global"
import { Box, Button, Group, Modal, Radio, Select, Stack, Text, TextInput, Textarea } from "@mantine/core"
import ModalAddStep from "../component/modal_add_step"
import { useAtom } from "jotai"
import { isModalStep } from "../val/val_step"
import { useEffect, useState } from "react"
import toast from "react-simple-toasts"
import { CiPickerEmpty } from "react-icons/ci"
import { useEditor } from "@tiptap/react"
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import { Link, RichTextEditor } from "@mantine/tiptap"
import { funGetCandidateActiveByArea } from "@/modules/candidate"
import _ from "lodash"

/**
 * Fungsi untuk menampilkan view form add step.
 * @returns {component} view form add step.
 */

export default function AddStep({ params, candidate, provinsi, kabupaten }: { params: any, candidate: any, provinsi: any, kabupaten: any }) {
    const [openModal, setOpenModal] = useAtom(isModalStep)
    const [isDataCandidate, setDataCandidate] = useState(candidate)
    const [dataProvinsi, setDataProvinsi] = useState(provinsi)
    const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
    const [isProvinsi, setProvinsi] = useState<any>(String(params.idProvinsi) || null)
    const [isKabupaten, setKabupaten] = useState<any>(String(params.idKabkot) || null)
    const [isCandidate, setCandidate] = useState<any>(null)
    const [isCategory, setCategory] = useState<any>(null)

    async function onProvinsi({ idProv }: { idProv: any }) {
        setProvinsi(idProv)
        setKabupaten(null)
        setCandidate(null)
        setBody({
            ...isBody,
            idCandidate: ''
        })
        const dataDbKab = await MasterKabGetByProvince({ idProvinsi: Number(idProv) })
        const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(idProv), tingkat: 1 } })
        setDataKabupaten(dataDbKab)
        setDataCandidate(dataDbCan)
    }

    async function onKabupaten({ idKab }: { idKab: any }) {
        setKabupaten(idKab)
        setCandidate(null)
        setBody({
            ...isBody,
            idCandidate: ''
        })
        const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(isProvinsi), idKabkot: Number(idKab), tingkat: 2 } })
        setDataCandidate(dataDbCan)
    }

    // useEffect(() => {
    //     setProvinsi((params.idProvinsi == 0) ? null : params.idProvinsi)
    //     setKabupaten((params.idKabkot == 0) ? null : params.idKabkot)
    // }, [params])


    const [isBody, setBody] = useState({
        idCandidate: "",
        category: "",
        // sentiment: "1"
    })

    const editorPositive = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextStyle,
            Color,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: "",
    });

    const editorNegative = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextStyle,
            Color,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: "",
    });

    function onConfirmation() {
        if (Object.values(isBody).includes("") || ((editorPositive?.getHTML() == '' || editorPositive?.getHTML() == '<p></p>') && (editorNegative?.getHTML() == '' || editorNegative?.getHTML() == '<p></p>')))
            return toast("Form cannot be empty", { theme: "dark" });
        setOpenModal(true)
    }
    return (
        <>
            <ButtonBack />
            <Stack mt={30}>
                <Text fw={"bold"}>TAMBAH STEP</Text>
            </Stack>
            <Box pt={30}>
                <Stack>
                    <Group grow>
                        <Select
                            placeholder="Pilih Provinsi"
                            data={dataProvinsi.map((pro: any) => ({
                                value: String(pro.id),
                                label: pro.name
                            }))}
                            required
                            label={"Provinsi"}
                            value={isProvinsi}
                            searchable
                            onChange={(val) => onProvinsi({ idProv: val })}
                        // disabled
                        />
                        <Select
                            placeholder="Pilih Kabupaten/Kota"
                            data={dataKabupaten.map((kab: any) => ({
                                value: String(kab.id),
                                label: kab.name
                            }))}
                            label={"Kabupaten"}
                            value={isKabupaten}
                            searchable
                            onChange={(val) => onKabupaten({ idKab: val })}
                        // disabled
                        />
                    </Group>
                    <Select mt={20}
                        placeholder="Pilih Kandidat"
                        data={isDataCandidate.map((can: any) => ({
                            value: String(can.id),
                            label: can.name
                        }))}
                        required
                        value={isCandidate}
                        label={"Kandidat"}
                        searchable
                        onChange={(val) => {
                            setCandidate(val)
                            setBody({
                                ...isBody,
                                idCandidate: (_.isNull(val)) ? '' : String(val)
                            })
                        }}
                    />
                </Stack>
                <Select mt={20}
                    placeholder="Pilih Kategori"
                    data={["SOSIAL", "TEKNOLOGI", "EKONOMI", "POLITIK"]}
                    label={"Kategori"}
                    required
                    value={isCategory}
                    onChange={(val) => {
                        setCategory(val)
                        setBody({
                            ...isBody,
                            category: (_.isNull(val)) ? '' : String(val)
                        })
                    }}
                />
                {/* <Radio.Group mt={20} label={"Sentiment"} required value={isBody.sentiment} onChange={(val) => {
                    setBody({
                        ...isBody,
                        sentiment: val
                    })
                }}>
                    <Group mt="xs">
                        <Radio value="1" label="Positive" />
                        <Radio value="2" label="Negative" />
                    </Group>
                </Radio.Group> */}
                {/* <Textarea
                    mt={20}
                    placeholder="Value Content"
                    label={"Content"}
                    required
                    onChange={(val) => {
                        setBody({
                            ...isBody,
                            content: val.target.value
                        })
                    }}
                /> */}
                <Box pt={30}>
                    <Text>POSITIVE</Text>
                    <RichTextEditor editor={editorPositive}>
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
                <Box pt={30}>
                    <Text>NEGATIVE</Text>
                    <RichTextEditor editor={editorNegative}>
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
                    <Button bg={"gray"} mt={30} size="md" onClick={onConfirmation}>SIMPAN</Button>
                </Group>
            </Box>
            <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
                centered
                withCloseButton={false}
                closeOnClickOutside={false}
            >
                <ModalAddStep data={isBody} textPositive={editorPositive?.getHTML()} textNegative={editorNegative?.getHTML()} onSuccess={() => {
                    editorPositive?.commands.setContent('<p></p>')
                    editorNegative?.commands.setContent('<p></p>')
                    setCategory(null)
                    // setProvinsi(null)
                    // setKabupaten(null)
                    // setCandidate(null)
                    setBody({
                        ...isBody,
                        // idCandidate: '',
                        category: '',
                        // sentiment: '1'
                    })
                }} />
            </Modal>
        </>
    )
}