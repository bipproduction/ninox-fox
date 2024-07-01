'use client'
import React from 'react';
import { Alert, Box, Button, Group, Text } from "@mantine/core"
import toast from 'react-simple-toasts';
import { useAtom } from 'jotai';
import { isModalConf } from '../val/isModalConf';
import funUpdateConfUser from '../fun/update_conf_user';
import { funLogUser } from '../..';

export default function ModalEditConfUser({ data, dataArea }: { data: any, dataArea: any }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalConf)
  async function onUser() {
    const create = await funUpdateConfUser({ data: data, dataArea: dataArea })
    if (!create.success) return toast(create.message, { theme: "dark" });
    await funLogUser({ act: 'UPD', desc: `User mengubah data User`, idContent: data.id, tbContent: 'user' })
    toast("Sukses", { theme: "dark" });
    setOpenModal(false);
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>
            ANDA YAKIN INGIN MENGEDIT USER?
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

