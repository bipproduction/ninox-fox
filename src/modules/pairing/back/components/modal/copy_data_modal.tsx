import { Alert, Box, Button, Group, Text } from "@mantine/core";
import { useAtom } from "jotai";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-simple-toasts";
import { isModalPairing } from "../../val/val_modal_pairing";


/**
 * Fungsi menampilkan modal.
 * @returns  Hasil dari Copy data modal untuk menampilkan allert yes or no
 */
export default function ModalCopy() {
  const [openModal, setOpenModal] = useAtom(isModalPairing);
  const router = useRouter();

  async function onUpload() {
    // router.push("/dashboard/pairing");
    toast("Success Copy Data", { theme: "dark" });
    setOpenModal(false);
  }

  return (
    <>
      <Box>
        <Alert color="gray" variant="outline">
          <Text fw={700} ta={"center"} mb={20} mt={20}>
            YAKIN INGIN MELAKUKAN COPY DATA?
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
            <Button radius={10} color="gray.7" w={150} onClick={onUpload}>
              YA
            </Button>
          </Group>
        </Alert>
      </Box>
    </>
  );
}