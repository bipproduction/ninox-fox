'use client'
import { Alert, Box, Button, Group, Text } from "@mantine/core";
import { useAtom } from "jotai";
import React, { useState } from "react";
import toast from "react-simple-toasts";
import { isModalEmotion } from "../../val/val_emotion";
import funCopyEmotion from "../../fun/copy_emotion";
import { funAddNotifications, funGetAccessArea } from "@/modules/_global";
import moment from "moment";
import { funLogUser } from "@/modules/user";

/**
 * Fungsi menampilkan modal.
 * @returns  Hasil dari Copy data modal untuk menampilkan allert yes or no
 */

export default function ModalCopyEmotion({ from, to, candidate, onSuccess }: { from: any, to: any, candidate: any, onSuccess: (val: any) => void }) {
  const [openModal, setOpenModal] = useAtom(isModalEmotion);
  const [isLoading, setLoading] = useState(false)

  async function onUpload() {
    const cek = await funGetAccessArea({ candidate: candidate })
    if (!cek) {
      setOpenModal(false)
      return toast("Anda tidak mempunyai akses ke wilayah tersebut", { theme: "dark" })
    }
    setLoading(true)
    await funCopyEmotion({ dateFrom: from, dateTo: to, candidate: candidate })
    await funLogUser({ act: 'CPY', desc: `User mengcopy data sentimen (${candidate} - ${moment(from).format('DD/MM/YY')} to ${moment(to).format('DD/MM/YY')})`, idContent: '-', tbContent: 'emotion' })
    await funAddNotifications({ kategori: 'emotion', candidateId: candidate })
    setLoading(false)
    toast('Success', { theme: 'dark' })
    setOpenModal(false)
    onSuccess(true)
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>
            ANDA YAKIN INGIN MENGCOPY DATA SENTIMEN KANDIDAT?
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
            <Button loading={isLoading} radius={10} color="gray.7" w={150} onClick={() => onUpload()}>
              YA
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}