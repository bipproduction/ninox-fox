"use client"
import { Box, Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core';
import React from 'react';

import { useListState, randomId } from '@mantine/hooks';
import { Checkbox } from '@mantine/core';
import { RiEmotionLaughLine } from 'react-icons/ri';
import { ButtonBack } from '@/modules/_global';
import { isModalRoleUser } from '../val/val_role_user';
import { useAtom } from 'jotai';
import ModalAddRoleUser from '../components/modal_add_role_user';

const emotion = [
  { label: 'Pencarian Data', checked: false, key: 1 },
  { label: 'Upload Data', checked: false, key: 2 },
  { label: 'Download Data', checked: false, key: 3 },
  { label: 'Copy Data', checked: false, key: 4 },
  { label: 'Tabel Data', checked: false, key: 5 },
];

/**
 * Fungsi untuk add role user.
 * @returns {Component} hasil untuk menampilkan add role user
 */
export default function AddRoleUser() {
  const [valOpenModal, setOpenModal] = useAtom(isModalRoleUser)
  const [values, handlers] = useListState(emotion);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const emotiondata = values.map((value, index) => (
    <Checkbox
      mt="xs"
      ml={33}
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
    />
  ));
  return (
    <>
      <Stack>
        <ButtonBack />
        <Text fw={"bold"}>ADD ROLE USER</Text>
      </Stack>
      <Box pt={20}>
        <Box
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10
          }}
        >
          <TextInput label={"Create User Role"} placeholder='User Role'/>
          <Box pt={20}>
            <Box style={{
              backgroundColor: "gray",
              padding: 10,
              borderRadius: 10
            }}>
              <Text mb={10} c={"white"} fw={'bold'}>Create Components</Text>
              <Box style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10
              }}>
                <Box pb={20}>
                  <Checkbox
                    checked={allChecked}
                    label="All Data"
                    indeterminate={indeterminate}
                    onChange={() =>
                      handlers.setState((current) =>
                        current.map((value) => ({ ...value, checked: !allChecked }))
                      )
                    }
                  />
                </Box>
                <Group justify='space-between' grow>
                  <Box>
                    <Checkbox
                      checked={allChecked}
                      indeterminate={indeterminate}
                      label="All Emotion Editor"
                      onChange={() =>
                        handlers.setState((current) =>
                          current.map((value) => ({ ...value, checked: !allChecked }))
                        )
                      }
                    />
                    {emotiondata}
                  </Box>
                </Group>
              </Box>
            </Box>
          </Box>
          <Group justify='flex-end' pt={20}>
            <Button w={150} bg={"gray"} onClick={() => setOpenModal(true)}>SUBMIT</Button>
          </Group>
        </Box>
      </Box>
      <Modal
      opened={valOpenModal}
      onClose={() => setOpenModal(false)}
      centered
      closeOnClickOutside={false}
      withCloseButton={false}
      >
        <ModalAddRoleUser/>
      </Modal>
    </>
  );
}