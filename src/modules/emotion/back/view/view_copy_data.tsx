"use client";
import { ButtonBack, MasterKabGetByProvince } from "@/modules/_global";
import {
  Box,
  Button,
  Center,
  Group,
  Image,
  Modal,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { funGetCandidateActiveByArea } from "@/modules/candidate";
import _ from "lodash";
import toast from "react-simple-toasts";
import moment from "moment";
import { isModalEmotion } from "../val/val_emotion";
import ModalCopyEmotion from "../components/modal/modal_emotion";
import funCekEmotion from "../fun/cek_emotion";

/**
 * Fungsi Untuk menampilkan halaman copy data.
 * @returns Hasilnya menampilkan tanggal dan button untuk proccess copy data.
 */

export default function ViewCopyData({ provinsi, kabupaten, candidate, valDef }: { provinsi: any, kabupaten: any, candidate: any, valDef: any }) {
  const [value, setValue] = useState<Date | null>(null);
  const [openModal, setOpenModal] = useAtom(isModalEmotion);
  const [dataKabupaten, setDataKabupaten] = useState<any>(kabupaten)
  const [dataCandidate, setDataCandidate] = useState<any>(candidate)
  const [isProvinsi, setProvinsi] = useState<any>(String(valDef.idProvinsi))
  const [isKabupaten, setKabupaten] = useState<any>(String(valDef.idKabkot))
  const [isCandidate1, setCandidate1] = useState<any>(null)
  const [isFrom, setFrom] = useState(null)
  const [isTo, setTo] = useState(null)
  const [trueFrom, setTrueFrom] = useState<any>(null)
  const [trueTo, setTrueTo] = useState<any>(null)

  async function onProvinsi(val: any) {
    setProvinsi(val)
    setKabupaten(null)
    setCandidate1(null)
    const dataDbKab = await MasterKabGetByProvince({ idProvinsi: Number(val) })
    const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(val), tingkat: 1 } })
    setDataKabupaten(dataDbKab)
    setDataCandidate(dataDbCan)
  }

  async function onKabupaten(val: any) {
    setKabupaten(val)
    setCandidate1(null)
    const dataDbCan = await funGetCandidateActiveByArea({ find: { idProvinsi: Number(isProvinsi), idKabkot: Number(val), tingkat: (val == null) ? 1 : 2 } })
    setDataCandidate(dataDbCan)
  }

  function onCandidate1(val: any) {
    setCandidate1(val)
    setFrom(null)
    setTo(null)
  }

  async function cekFrom(isDate: any) {
    if (_.isNull(isProvinsi)) return toast('Silahkan pilih provinsi', { theme: 'dark' })
    if (_.isNull(isCandidate1)) return toast('Silahkan pilih kandidat', { theme: 'dark' })

    const tgl = moment(isDate).format('YYYY-MM-DD')
    const cek = await funCekEmotion({ date: new Date(tgl), candidate: isCandidate1 })
    if (!cek.ada) {
      setFrom(null)
      setTrueFrom(null)
      return toast('Tidak ada data', { theme: 'dark' })
    }
    setFrom(isDate)
    setTrueFrom(new Date(tgl))
    return toast('Silahkan pilih tanggal tujuan', { theme: 'dark' })
  }

  async function cekTo(isDate: any) {
    if (_.isNull(isProvinsi)) return toast('Silahkan pilih provinsi', { theme: 'dark' })
    if (_.isNull(isCandidate1)) return toast('Silahkan pilih kandidat', { theme: 'dark' })

    const tgl = moment(isDate).format('YYYY-MM-DD')
    const cek = await funCekEmotion({ date: new Date(tgl), candidate: isCandidate1 })
    if (cek.ada) {
      setTo(null)
      setTrueTo(null)
      return toast('Sudah ada data', { theme: 'dark' })
    }
    setTo(isDate)
    setTrueTo(new Date(tgl))
    return toast('Silahkan proses', { theme: 'dark' })
  }


  return (
    <>
      <Stack>
        <ButtonBack />
        <Text fw={"bold"} fz={20}>
          {" "}
          COPY DATA SENTIMEN KANDIDAT
        </Text>
      </Stack>

      <Box pt={10}>
        <Box
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 2 }}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xl" }}
          >
            <Box>
              <Box>
                <Select
                  placeholder="Pilih Provinsi"
                  data={provinsi.map((pro: any) => ({
                    value: String(pro.id),
                    label: pro.name
                  }))}
                  value={isProvinsi}
                  required
                  label={"Provinsi"}
                  searchable
                  onChange={(val) => { onProvinsi(val) }}
                />
              </Box>
              <Box pt={20}>
                <Select
                  placeholder="Pilih Kabupaten/Kota"
                  data={dataKabupaten.map((kab: any) => ({
                    value: String(kab.id),
                    label: kab.name
                  }))}
                  value={isKabupaten}
                  label="Kabupaten/Kota"
                  searchable
                  onChange={(val) => { onKabupaten(val) }}
                />
              </Box>
            </Box>
            <Box>
              <Box>
                <Select
                  placeholder="KANDIDAT"
                  data={dataCandidate.map((can: any) => ({
                    value: String(can.id),
                    label: can.name
                  }))}
                  value={isCandidate1}
                  required
                  label={"Kandidat"}
                  searchable
                  onChange={(val) => { onCandidate1(val) }}
                />
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
      <Box>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 2 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          <Box pt={40}>
            <Center>
              <Box>
                <Text fw={"bold"} fz={20}>
                  DARI TANGGAL
                </Text>
                <Box
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <DatePicker value={isFrom} onChange={(val) => { cekFrom(val) }} />
                </Box>
              </Box>
            </Center>
          </Box>
          <Box pt={40}>
            <Center>
              <Box>
                <Text fw={"bold"} fz={20}>
                  SAMPAI TANGGAL
                </Text>
                <Box
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <DatePicker value={isTo} onChange={(val) => { cekTo(val) }} />
                </Box>
                <Group justify="flex-end">
                  {
                    (isFrom != null && isTo != null) &&
                    <Button
                      mt={20}
                      bg={"gray"}
                      onClick={() => setOpenModal(true)}
                    >
                      PROSES
                    </Button>
                  }
                </Group>
              </Box>
            </Center>
          </Box>
        </SimpleGrid>
      </Box>

      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalCopyEmotion from={trueFrom} to={trueTo} candidate={isCandidate1} onSuccess={(val) => {
          setProvinsi(null)
          setKabupaten(null)
          setFrom(null)
          setTo(null)
          setCandidate1(null)
        }}
        />
      </Modal>
    </>
  );
}
