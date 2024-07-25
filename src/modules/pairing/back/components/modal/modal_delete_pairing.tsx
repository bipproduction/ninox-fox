"use client"
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import toast from 'react-simple-toasts';
import { Alert, Box, Button, Group, Text } from '@mantine/core';
import { funGetAccessArea } from '@/modules/_global';
import { funLogUser } from '@/modules/user';
import moment from 'moment';
import { isModalPairing } from '../../val/val_modal_pairing';
import funDelPairing from '../../fun/delete_pairing';

export default function ModalDeletePairing({ isCandidate1, isCandidate2, isDateCan, onSuccess }: { isCandidate1: any, isCandidate2: any, isDateCan: any, onSuccess: (val: any) => void }) {

  const [openModal, setOpenModal] = useAtom(isModalPairing);
  const [isLoading, setLoading] = useState(false)

  async function delDataCan() {
    setLoading(true)
    const cek = await funGetAccessArea({ candidate: isCandidate1 })
    if (!cek) {
      setOpenModal(false)
      return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
    }

    const del = await funDelPairing({ can1: isCandidate1, can2: isCandidate2, dateCan: isDateCan })
    if (del.available) {
      await funLogUser({ act: 'DEL', desc: `User menghapus data pasangan (${isCandidate1} & ${isCandidate2} - ${moment(isDateCan).format('DD/MM/YYYY')})`, idContent: '-', tbContent: 'pairing' })
      toast("Success", { theme: "dark" });
    } else {
      toast("Tidak ada data pasangan yg dihapus", { theme: "dark" });
    }

    setLoading(false)
    onSuccess(true)
    setOpenModal(false)
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>
            ANDA YAKIN INGIN MENGHAPUS DATA PASANGAN?
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

