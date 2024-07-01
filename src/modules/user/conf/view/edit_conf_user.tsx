"use client"
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { isModalConf } from '../val/isModalConf';
import { Box, Button, Checkbox, Chip, Divider, Group, Modal, NumberInput, Select, SimpleGrid, Stack, Table, Text, TextInput } from '@mantine/core';
import { ButtonBack } from '@/modules/_global';
import toast from 'react-simple-toasts';
import ModalEditConfUser from '../components/modal_edit_conf_user';

export default function EditConfUser({ data, role, wilayah }: { data: any, role: any, wilayah: any }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalConf)
  const [isData, setData] = useState<any[]>(wilayah)
  const [isRole, setRole] = useState<any[]>(role)
  const [dataUserUpdate, setDataUserUpdate] = useState(data.dataUser)
  const [isCekWilayah, setCekWilayah] = useState(data.dataArea.map((item: any) => (item.idProvinsi)))
  const [checked, setChecked] = useState(false);

  function validationData() {
    if (Object.values(dataUserUpdate).includes("") || Object.values(dataUserUpdate).includes(null))
      return toast("The form cannot be empty", { theme: "dark" });
    if (isCekWilayah.length < 1 || (isCekWilayah.length == 0))
      return toast("User role cannot be empty", { theme: "dark" });
    setOpenModal(true);
  }


  function setDataArea(val: any) {
    setChecked((v) => !v)
    setDataUserUpdate({
      ...dataUserUpdate,
      isAllArea: val
    })
  }

  return (
    <>
      <Stack>
        <ButtonBack />
        <Text fw={"bold"}>EDIT USER</Text>
        <Box
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10
          }}
        >
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 2 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
          >
            <Select
              placeholder='Pilih Role User'
              data={isRole.map((role) => ({
                value: String(role.id),
                label: role.name
              }))}
              onChange={(val: any) =>
                setDataUserUpdate({
                  ...dataUserUpdate,
                  idUserRole: val
                })
              }
              value={String(dataUserUpdate.idUserRole)}
            />
            <TextInput
              placeholder='Name'
              onChange={(val: any) =>
                setDataUserUpdate({
                  ...dataUserUpdate,
                  name: val.target.value
                })
              }
              value={dataUserUpdate.name}
            />
            <TextInput
              placeholder='Email'
              onChange={(val: any) =>
                setDataUserUpdate({
                  ...dataUserUpdate,
                  email: val.target.value
                })
              }
              value={dataUserUpdate.email}
            />
            <TextInput
              placeholder='Password'
              onChange={(val: any) =>
                setDataUserUpdate({
                  ...dataUserUpdate,
                  password: val.target.value
                })
              }
              value={dataUserUpdate.password}
            />
            <NumberInput
              placeholder='Phone'
              onChange={(val: any) =>
                setDataUserUpdate({
                  ...dataUserUpdate,
                  phone: val
                })
              }
              value={dataUserUpdate.phone}
            />
            <Chip color="cyan"
              onChange={(val) => setDataArea(val)}
              // checked={checked}
              checked={dataUserUpdate.isAllArea}
              // defaultChecked={dataUserUpdate.isAllArea}
              variant="outline"
              size="lg"
              radius="sm"
            >ALL AREA</Chip>
          </SimpleGrid>
          {!dataUserUpdate.isAllArea && (
            <Box>
              <Box pt={40} pb={40}>
                <Divider size={"md"} />
              </Box >
              <Text mb={10} fw={"bold"}>PILIH WILAYAH</Text>
              <Table
                withTableBorder
                horizontalSpacing="xl"
              >
                <Table.Thead>
                  <Table.Tr
                    style={{
                      borderBottom: "1px solid #CED4D9",
                    }}
                  >
                    <Table.Th>No</Table.Th>
                    <Table.Th>PROVINSI</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {isData.map((v, i) => (
                    <Table.Tr key={i}>
                      <Table.Td>{i + 1}</Table.Td>
                      <Table.Td>
                        <Chip.Group multiple
                          value={isCekWilayah}
                          onChange={setCekWilayah}
                        >
                          <Chip
                            checked={isCekWilayah.includes(Number(v.id))}
                            color="cyan" variant="light" radius="sm" value={String(v.id)}>{v.name}</Chip>
                        </Chip.Group>
                      </Table.Td>

                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Box>
          )}
          <Group justify="flex-end">
            <Box
              style={{
                padding: 10,
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
              onClick={validationData}
            >
              <Group>
                <Text fw={"bold"} c={"white"}>SIMPAN</Text>
              </Group>
            </Box>
          </Group>
        </Box>
      </Stack>
      <Modal
        opened={valOpenModal}
        onClose={() => setOpenModal(false)}
        centered
        closeOnClickOutside={false}
        withCloseButton={false}
      >
        <ModalEditConfUser data={dataUserUpdate} dataArea={isCekWilayah} />
      </Modal>
    </>
  );
}
