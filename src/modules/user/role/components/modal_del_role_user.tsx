'use client'
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import toast from 'react-simple-toasts';
import { isModalRoleUser } from '../val/val_role_user';
import funDelRoleUser from '../fun/delete_user_role';
import { funLogUser } from '../..';

/**
 * Fungsi untuk menampilkan Modal Delete User Role.
 * @param {id} id - menampilkan id.
 * @param {onSuccess} onSuccess - menampilkan onSuccess.
 * @returns Untuk menampilkan Modal Delete User Role
 */
export default function ModalDelRoleUser({ id, onSuccess }: { id: any, onSuccess: (val: any) => void }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalRoleUser)
  const [isLoading, setLoading] = useState(false)

  async function delRole() {
    setLoading(true)
    const del = await funDelRoleUser({ id: id })
    if (!del.success) {
      setLoading(false)
      return toast(del.message, { theme: "dark" })
    }
    toast("Success", { theme: "dark" });
    await funLogUser({ act: 'DEL', desc: `User menghapus data Role User`, idContent: id, tbContent: 'roleuser' })
    setOpenModal(false);
    onSuccess(del.delData)
    setLoading(false)
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>APAKAH ANDA YAKIN MENGHAPUS ROLE USER INI?</Text>
          <Group justify="space-between" pt={10}>
            <Button
              radius={10}
              color="gray.7"
              w={150}
              onClick={() => setOpenModal(false)}
            >
              TIDAK
            </Button>
            <Button
              radius={10}
              color="gray.7"
              w={150}
              onClick={delRole}
              loading={isLoading}
            >
              YA
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

