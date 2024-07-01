'use client'
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { useAtom } from 'jotai';
import React from 'react';
import { isModalLayout } from '../val/isModalLayout';
import { useRouter } from 'next/navigation';
import { funLogout } from '@/modules/auth';
import toast from 'react-simple-toasts';

/**
 * Menampilkan modal konfirmasi logout.
 * Yang jika klik "NO" maka modal akan close,
 * sedangkan jika klik "YES" maka user akan logout.
 * @returns komponen modal logout
 */

export default function ModalLogout() {
  const router = useRouter()
  const [valOpenModal, setOpenModal] = useAtom(isModalLayout)

  async function logoutYes() {
    // await funLogUser({ act: 'LOGOUT', desc: 'User logout' })
    setOpenModal(false)
    await funLogout()
    toast("Logout Success", { theme: "dark" })
  }
  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>
            APAKAH ANDA YAKIN INGIN LOGOUT?
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
            <Button radius={10} color="gray.7" w={150} onClick={() => logoutYes()}>
              YA
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

