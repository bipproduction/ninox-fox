'use client'
import { WARNA } from '@/modules/_global';
import { Box, Image, SimpleGrid, Stack, Text } from '@mantine/core';
import _ from 'lodash';
import React, { useState } from 'react';

export default function CandidateSummary({ candidate, persen }: { candidate: any, persen: any }) {
  const [isNameCan, setNameCan] = useState(candidate?.name)
  const [isImgCan, setImgCan] = useState(`/img/candidate/${candidate?.img}`)

  return (
    <>
      <Box style={{
        zIndex: 999
      }}>
        <Box
        >
          <Image src={isImgCan} bg={"white"} style={{ border: "4px solid white" }} radius={"100%"} alt='kandidat' maw={200} mx="auto" />
          <Box p={10}>
            <Text fw={"bold"} ta={"center"} fz={{ base: 12, xl: 16, lg: 15, md: 14, sm: 13 }} c={"white"}>{isNameCan}</Text>
          </Box>
        </Box>
        <Box pt={{ base: 5, xl: 20, lg: 20, md: 10, sm: 10}}>
          <SimpleGrid
            cols={{ base: 1, sm: 1, lg: 3, xl: 3 }}
          >
            <Box>
              <Box style={{
                backgroundColor: WARNA.hijau,
                border: "1px solid #ffff",
                padding: 5,
                borderRadius: 5
              }}>
                <Text ml={5} fz={{base: 10, xl: 13, lg: 12, sm: 11}} c={"white"}>POSITIF</Text>
                <Text ta={'center'} fw={'bold'} c={"white"} fz={{base: 18, xl: 23, md: 20, sm: 18}}>{_.isNaN(persen.positive) ? 0 : persen.positive}%</Text>
              </Box>
            </Box>
            <Box>
              <Box style={{
                backgroundColor: "white",
                border: "1px solid #ffff",
                padding: 5,
                borderRadius: 5
              }}>
                <Text ml={5} fz={{base: 10, xl: 13, lg: 12, sm: 11}} c={WARNA.hijau}>NETRAL</Text>
                <Text ta={'center'} fw={'bold'} c={WARNA.hijau} fz={{base: 18, xl: 23, md: 20, sm: 18}}>{_.isNaN(persen.neutral) ? 0 : persen.neutral}%</Text>
              </Box>
            </Box>
            <Box>
              <Box style={{
                backgroundColor: WARNA.merah,
                border: "1px solid #ffff",
                padding: 5,
                borderRadius: 5
              }}>
                <Text ml={5} fz={{base: 10, xl: 13, lg: 12, sm: 11}} c={"white"}>NEGATIF</Text>
                <Text ta={'center'} fw={'bold'} c={"white"} fz={{base: 18, xl: 23, md: 20, sm: 18}}>{_.isNaN(persen.negative) ? 0 : persen.negative}%</Text>
              </Box>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
