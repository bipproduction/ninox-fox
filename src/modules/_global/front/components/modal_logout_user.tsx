'use client'
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import React from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import toast from 'react-simple-toasts';
import { isModalLayout } from '../val/isModallayout';
import { WARNA } from '../../fun/WARNA';
import { funLogout } from '@/modules/auth';

/**
 * Menampilkan modal konfirmasi logout.
 * Yang jika klik "NO" maka modal akan close,
 * sedangkan jika klik "YES" maka user akan logout.
 * @returns komponen modal logout
 */

export default function ModalLogoutUser() {
  const router = useRouter()
  const [valOpenModal, setOpenModal] = useAtom(isModalLayout)

  async function logoutYes() {
    // router.push(`/`)
    setOpenModal(false)
    await funLogout()
    toast("Logout Success", { theme: "dark" })
  }
  return (
    <>
      <Box>
        <Alert variant="filled" color={WARNA.ungu} >
          <Text fw={700} ta={"center"} mb={20} mt={20}>
            APAKAH ANDA YAKIN INGIN LOGOUT?
          </Text>
          <Group justify="space-between" pt={10}>
            <Button
              radius={10}
              color={"white"}
              w={150}
              onClick={() => setOpenModal(false)}
              bg={WARNA.merah}
            >
              TIDAK
            </Button>
            <Button radius={10} color={"white"} bg={WARNA.hijau} w={150} onClick={() => logoutYes()}>
              YA
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}
