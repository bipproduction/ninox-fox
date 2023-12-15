import { useAtom } from 'jotai';
import React from 'react';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import toast from 'react-simple-toasts';
import funDeleteConfUser from '../fun/delete_conf_user';
import funLogUser from '../../log/fun/add_log';
import { isModalConf } from '../val/isModalConf';

/**
 * Fungsi untuk menampilkan Modal Delete User Role.
 * @param {id} id - menampilkan id.
 * @param {onSuccess} onSuccess - menampilkan onSuccess.
 * @returns Untuk menampilkan Modal Delete User Role
 */
export default function ModalDeleteConfUser({ id, onSuccess }: { id: any, onSuccess: (val: any) => void }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalConf)

  async function delRole() {
    const del = await funDeleteConfUser({ id: id })
    if (!del.success) return toast(del.message, { theme: "dark" })
    await funLogUser({ act: "DELETE", desc: `User Delete Data User (ID: ${id})` })
    toast("Success", { theme: "dark" });
    setOpenModal(false);
    onSuccess(del.delData)
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>ARE YOU SURE TO DELETE THIS USER?</Text>
          <Group justify="space-between" pt={10}>
            <Button
              radius={10}
              color="gray.7"
              w={150}
              onClick={() => setOpenModal(false)}
            >
              NO
            </Button>
            <Button
              radius={10}
              color="gray.7"
              w={150}
              onClick={delRole}
            >
              YES
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

