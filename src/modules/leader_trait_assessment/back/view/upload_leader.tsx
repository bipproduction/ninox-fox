'use client'
import { ButtonBack } from '@/modules/_global';
import { Box, Button, Center, Group, Modal, ScrollArea, Stack, Table, Text, Title, rem } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import papa from 'papaparse'
import { useState } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { GrDocumentCsv } from 'react-icons/gr';
import { MdCancelPresentation } from 'react-icons/md';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalLta } from '../val/val_lta';
import ModalUploadLta from '../components/modal_upload_lta';

/**
 * Fungsi untuk upload leader.
 * @returns {Component} hasil untuk menampilkan upload leader
 */
export function ViewUploadLeader() {
  const [json, setJson] = useState<any[]>([])
  const [openModal, setOpenModal] = useAtom(isModalLta)
  const [isLoading, setLoading] = useState(false)

  async function onLoad(data: any) {
    if (data.length > 0) {
      if (
        ('id' in data[0]) &&
        ('Provinsi' in data[0]) &&
        ('Kabkot' in data[0]) &&
        ('Kecamatan' in data[0]) &&
        ('Kelurahan' in data[0]) &&
        ('pekerjaKeras' in data[0]) &&
        ('cerdas' in data[0]) &&
        ('jujur' in data[0]) &&
        ('merakyat' in data[0]) &&
        ('tegas' in data[0]) &&
        ('berpengalamanMemimpin' in data[0]) &&
        ('berprestasi' in data[0]) &&
        ('latarBelakangMiliter' in data[0]) &&
        ('agamis' in data[0])
      ) {
        setJson(data as any)
      } else {
        setJson([])
        toast('Format CSV salah', { theme: 'dark' })
      }
    } else {
      setJson([])
      toast('Data Kosong', { theme: 'dark' })
    }
  }


  return (
    <>
      <Stack>
        <ButtonBack />
      </Stack>
      <Stack p={"md"}>
        <Box
          style={{
            backgroundColor: "gray",
            padding: 20,
            borderRadius: 10
          }}
        >
          <Text fw={"bold"} c={"white"} mb={20}>UPLOAD DATA PENILAIAN SIFAT PEMIMPIN</Text>
          <Dropzone
            loading={isLoading}
            style={{
              border: "1px dashed",
              color: "white",
              borderRadius: 10,
              cursor: "pointer"
            }}
            onDrop={async (files: any) => {
              setLoading(true)
              const csv_file = Buffer.from(await files[0].arrayBuffer()).toString()
              const { data } = papa.parse(csv_file, { header: true, })
              onLoad(data)
              setLoading(false)
            }}
            onReject={(files: any) => {
              toast("success")

            }}
            maxSize={3 * 1024 ** 2}
            accept={['text/csv']}
          >
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <AiOutlineUpload
                  style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                  stroke={"1.5"}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <MdCancelPresentation
                  style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                  stroke={"1.5"}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <GrDocumentCsv
                  style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                  stroke={"1.5"}
                />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Seret file ke sini atau klik untuk memilih file
                </Text>
                <Text size="sm" inline mt={7} >
                  Lampirkan satu file, file tidak boleh melebihi 5MB
                </Text>
              </div>
            </Group>
          </Dropzone>
          {
            (json.length > 0) && (
              <>
                <Box style={{
                  borderRadius: 10,
                  paddingTop: 20
                }}>
                  <Box
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >


                    <ScrollArea>
                      <Table
                        withTableBorder
                        withRowBorders={false}
                        horizontalSpacing="xl"
                      >
                        <Table.Thead>
                          <Table.Tr
                            style={{
                              borderBottom: "1px solid #CED4D9",
                            }}
                          >
                            <Table.Th>ID</Table.Th>
                            <Table.Th>Provinsi</Table.Th>
                            <Table.Th>Kabupaten/Kota</Table.Th>
                            <Table.Th>Kecamatan</Table.Th>
                            <Table.Th>Kelurahan</Table.Th>
                            <Table.Th>Pekerja Keras</Table.Th>
                            <Table.Th>Cerdas</Table.Th>
                            <Table.Th>Jujur</Table.Th>
                            <Table.Th>Merakyat</Table.Th>
                            <Table.Th>Tegas</Table.Th>
                            <Table.Th>Berpengalaman Memimpin</Table.Th>
                            <Table.Th>Berprestasi</Table.Th>
                            <Table.Th>Latar Belakang Militer</Table.Th>
                            <Table.Th>Agamis</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {json.map(home =>
                            <Table.Tr key={home.id}>
                              <Table.Td>{home.id}</Table.Td>
                              <Table.Td>{home.Provinsi}</Table.Td>
                              <Table.Td>{home.Kabkot}</Table.Td>
                              <Table.Td>{home.Kecamatan}</Table.Td>
                              <Table.Td>{home.Kelurahan}</Table.Td>
                              <Table.Td>{home.pekerjaKeras}</Table.Td>
                              <Table.Td>{home.cerdas}</Table.Td>
                              <Table.Td>{home.jujur}</Table.Td>
                              <Table.Td>{home.merakyat}</Table.Td>
                              <Table.Td>{home.tegas}</Table.Td>
                              <Table.Td>{home.berpengalamanMemimpin}</Table.Td>
                              <Table.Td>{home.berprestasi}</Table.Td>
                              <Table.Td>{home.latarBelakangMiliter}</Table.Td>
                              <Table.Td>{home.agamis}</Table.Td>
                            </Table.Tr>
                          )}
                        </Table.Tbody>
                      </Table>
                    </ScrollArea>

                  </Box>
                </Box>
                <Group justify="flex-end">
                  <Button
                    style={{
                      borderRadius: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                      position: "fixed",
                      bottom: 30,
                      right: 30,
                      backgroundColor: "green",
                      boxShadow: "2px solid gray",
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      setOpenModal(true)
                    }}
                  >
                    <Group>
                      <AiOutlineUpload size={25} color={"white"} />
                      <Text fw={"bold"} c={"white"}>UPLOAD</Text>
                    </Group>
                  </Button>
                </Group>
              </>
            )
          }
        </Box>
      </Stack>

      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalUploadLta data={json} onSuccess={(val) => {
          setJson([])
        }} />
      </Modal>
    </>
  );
}

