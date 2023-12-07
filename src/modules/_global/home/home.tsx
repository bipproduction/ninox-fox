"use client"
import { Box, Button, Group, Modal, Select, SimpleGrid, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { isModalBeranda } from '../val/isModalBeranda';
import ModalBeranda from './components/modal_beranda';

/**
 * Fungsi untuk menampilkan dashboard.
 * @returns  hasilk yang ditampilkan seperti daftar access wilayah, jumlah kandidate, jumlah wilayah
 */

export default function Home({ pro, kab, kec, kel, can1, can2 }: { pro: number, kab: number, kec: number, kel: number, can1: number, can2: number }) {

  const [valOpenModal, setOpenModal] = useAtom(isModalBeranda)

  console.log(pro, kab, kec, kel, can1, can2)

  return (
    <>
      <Text fz={25} c={'#213555'} fw={'bold'}>HI ADMIN 2</Text>
      <Group>
        <Text c={"#4F709C"}>DEFAULT WILAYAH UNTUK DASHBOARD USER</Text>
        {/* <Select
          placeholder="Select Wilayah"
          defaultValue={'Jawa Timur'}
          data={['Jawa Timur', 'Kalimantan Tengah', 'DKI Jakarta']}
          radius={20}
          w={200}
        /> */}
        <Button variant="outline" color="#4F709C" radius="xl" onClick={() => setOpenModal(true)}>JAWA TIMUR</Button>
      </Group>
      <Box pt={30}>
        <Group grow>
          <Box style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 5
          }}>
            <Box pb={10}>
              <Text c={"#4F709C"} fw={'bold'}>DAFTAR AKSES WILAYAH</Text>
            </Box>
            <Group grow>
              <SimpleGrid
                cols={{ base: 1, sm: 3, lg: 3 }}
                spacing={{ base: 10, sm: 'xl' }}
                verticalSpacing={{ base: 'md', sm: 'xl' }}
              >
                <Box
                  style={{
                    backgroundColor: "#4F709C",
                    padding: 20,
                    borderRadius: 5
                  }}
                >
                  <Text c={"white"} ta={'center'}>Kalimantan Tengah</Text>
                </Box>
                <Box
                  style={{
                    backgroundColor: "#4F709C",
                    padding: 20,
                    borderRadius: 5
                  }}
                >
                  <Text c={"white"} ta={'center'}>DKI Jakarta</Text>
                </Box>
                <Box
                  style={{
                    backgroundColor: "#4F709C",
                    padding: 20,
                    borderRadius: 5
                  }}
                >
                  <Text c={"white"} ta={'center'}>Jawa Timur</Text>
                </Box>
              </SimpleGrid>
            </Group>
          </Box>
        </Group>
      </Box>
      <Box pt={30}>
        <Box style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 5
        }}>
          <Box pb={10}>
            <Text c={"#4F709C"} fw={'bold'}>JUMLAH KANDIDAT</Text>
          </Box>
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 2 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
          >
            <Box>
              <Box style={{
                backgroundColor: "#4F709C",
                padding: 20,
                borderRadius: 5
              }}>
                <Text c={"white"}>PROVINSI</Text>
                <Text ta={'center'} fw={'bold'} c={"white"} fz={70}>{can1}</Text>
              </Box>
            </Box>
            <Box>
              <Box style={{
                backgroundColor: "#4F709C",
                padding: 20,
                borderRadius: 5
              }}>
                <Text c={"white"}>KABUPATEN</Text>
                <Text ta={'center'} fw={'bold'} c={"white"} fz={70}>{can2}</Text>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
      <Box pt={30}>
        <Box style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 5
        }}>
          <Box pb={10}>
            <Text c={"#4F709C"} fw={'bold'}>JUMLAH WILAYAH</Text>
          </Box>
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 4 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
          >
            <Box>
              <Box style={{
                backgroundColor: "#4F709C",
                padding: 20,
                borderRadius: 5
              }}>
                <Text c={"white"}>PROVINSI</Text>
                <Text ta={'center'} fw={'bold'} c={"white"} fz={60}>{pro} --</Text>
              </Box>
            </Box>
            <Box>
              <Box style={{
                backgroundColor: "#4F709C",
                padding: 20,
                borderRadius: 5
              }}>
                <Text c={"white"}>KABUPATEN</Text>
                <Text ta={'center'} fw={'bold'} c={"white"} fz={60}>{kab}</Text>
              </Box>
            </Box>
            <Box>
              <Box style={{
                backgroundColor: "#4F709C",
                padding: 20,
                borderRadius: 5
              }}>
                <Text c={"white"}>KECAMATAN</Text>
                <Text ta={'center'} fw={'bold'} c={"white"} fz={60}>{kec}</Text>
              </Box>
            </Box>
            <Box>
              <Box style={{
                backgroundColor: "#4F709C",
                padding: 20,
                borderRadius: 5
              }}>
                <Text c={"white"}>KELURAHAN</Text>
                <Text ta={'center'} fw={'bold'} c={"white"} fz={60}>{kel}</Text>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
      <Modal
        opened={valOpenModal}
        onClose={() => setOpenModal(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
        size={"xl"}
      >
        <ModalBeranda />
      </Modal>
    </>

  );
}
