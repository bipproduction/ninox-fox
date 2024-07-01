'use client'
import React from 'react';
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import funAddConfUser from '../fun/add_conf_user';
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalConf } from '../val/isModalConf';
import { funLogUser } from '../..';

export default function ModalConfUser({ data, dataArea, onSuccess }: { data: any, dataArea: any, onSuccess: (val: any) => void }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalConf)
  async function onUser() {
    const create = await funAddConfUser({ data: data, dataArea: dataArea })
    if (!create.success) return toast(create.message, { theme: "dark" });
    await funLogUser({ act: 'ADD', desc: `User menambah data User`, idContent: create.data, tbContent: 'user' })
    toast("Sukses", { theme: "dark" })
    setOpenModal(false)
    onSuccess(true)
  }
  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>
            ANDA YAKIN INGIN MENAMBAH USER?
          </Text>
          <Group justify="space-between" pt={10}>
            <Button
              radius={10}
              color="gray.7"
              w={150}
              onClick={() => setOpenModal(false)}
            >
              TIDAK
            </Button>
            <Button radius={10} color="gray.7" w={150} onClick={onUser}>
              YA
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}
