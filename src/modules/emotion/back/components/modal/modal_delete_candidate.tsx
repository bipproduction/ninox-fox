"use client"
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { isModalEmotion } from '../../val/val_emotion';
import funDelCandidate from '../../fun/delete_candidate';
import toast from 'react-simple-toasts';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { funGetAccessArea } from '@/modules/_global';
import { funLogUser } from '@/modules/user';
import moment from 'moment';

export default function ModalDeleteCandidate({ isCandidate, isDateCan, onSuccess }: { isCandidate: any, isDateCan: any, onSuccess: (val: any) => void }) {

  const [openModal, setOpenModal] = useAtom(isModalEmotion);
  const [isLoading, setLoading] = useState(false)

  async function delDataCan() {
    setLoading(true)
    const cek = await funGetAccessArea({ candidate: isCandidate })
    if (!cek) {
      setOpenModal(false)
      return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
    }

    await funDelCandidate({ candidate: isCandidate, dateCan: isDateCan })
    await funLogUser({ act: 'DEL', desc: `User menghapus data sentimen (${isCandidate} - ${moment(isDateCan).format('DD/MM/YYYY')})`, idContent: '-', tbContent: 'emotion' })
    setLoading(false)
    onSuccess(true)
    toast("Success", { theme: "dark" });
    setOpenModal(false)
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>
            ANDA YAKIN INGIN MENGHAPUS DATA KANDIDAT?
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
            <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => delDataCan()}>
              YA
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}

