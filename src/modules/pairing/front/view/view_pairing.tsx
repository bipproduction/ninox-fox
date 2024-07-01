"use client"
import { Box, Button, Center, Divider, Grid, Group, Image, rem, ScrollArea, Select, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import EchartPairingSentiment from '../components/echart_pairing_sentiment';
import { Glitch, PageSubTitle, WARNA } from '@/modules/_global';
import _ from 'lodash';
import { funGetPairingRegional, funGetPairingRegionalNew } from '../..';
import { useAtom } from 'jotai';
import { useHeadroom } from '@mantine/hooks';
import { isDetactionNavbar } from '@/modules/regional_insights';
import toast from 'react-simple-toasts';


export default function ViewPairingFront({ candidate, data, area, tingkat }: { candidate: any, data: any, area: any, tingkat: any }) {
  const [isData, setData] = useState(data)
  const [isCandidate1, setCandidate1] = useState(data.candidate.idCandidate1)
  const [isCandidate2, setCandidate2] = useState(data.candidate.idCandidate2)
  const [isAllBarChart, setAllBarChart] = useState(data.chart)
  const [isBarChart, setBarChart] = useState(data.chart)
  const [isArea, setArea] = useState<any>(null)
  const [isGlitch, setGlitch] = useState(false)

  const [isDetection, setDetection] = useAtom(isDetactionNavbar)
  const pinned = useHeadroom({ fixedAt: 120 });

  async function onGenerate() {
    if (isCandidate1 == null || isCandidate2 == null || isCandidate1 == undefined || isCandidate2 == undefined) {
      setGlitch(true)
      await new Promise((r) =>
        setTimeout(r, 300)
      )
      setGlitch(false)
      return toast("Silahkan pilih kandidat", { theme: "light", position: 'center', })
    }
    const data = await funGetPairingRegionalNew({ candidate1: isCandidate1, candidate2: isCandidate2 })
    setData(data)
    setBarChart(data.chart)
    setAllBarChart(data.chart)
  }


  function onFilter(val: any) {
    setArea(val)
    if (_.isNull(val)) {
      onGenerate()
    } else {
      const hasilFilter = isAllBarChart.filter((i: any) => i.idArea == val)
      setBarChart(hasilFilter)
    }
  }

  return (
    <>
      {isGlitch && <Glitch />}
      <Box
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          padding: 20,
          paddingBottom: 40,
          height: isDetection ? rem(175) : rem(145),
          zIndex: 20,
          transform: `translate3d(0, ${pinned ? 0 : isDetection ? rem(-165) : rem(-145)}, 0)`,
          transition: 'transform 400ms ease',
          backgroundColor: WARNA.ungu,
        }}
        left={isDetection ? 250 : 100}
      >
        <PageSubTitle text1='DATA PASANGAN' text2='REGIONAL' />
        <Group justify='flex-end'>
          <Select
            placeholder="Pilih wilayah"
            data={area.map((pro: any) => ({
              value: String(pro.id),
              label: pro.name
            }))}
            value={isArea}
            onChange={(val: any) => onFilter(val)}
          />
        </Group>
      </Box>
      <Stack pt={`calc(${rem(120)} + var(--mantine-spacing-md))`}>
        <Grid gutter={30}>
          <Grid.Col span={{ md: 5, lg: 5 }}>
            <Box
            >
              <Box
                style={{
                  // background: "rgba(0,0,0,0.3)",
                  padding: 10,
                  borderRadius: 10
                }}
                bg={{ base: '', sm: '', md: "rgba(0,0,0,0.3)", lg: 'rgba(0,0,0,0.3)', xl: 'rgba(0,0,0,0.3)' }}
              >
                <SimpleGrid
                  cols={{ sm: 2, lg: 2 }}
                  spacing={{ base: 10, sm: 'xl' }}
                  verticalSpacing={{ base: 'md', sm: 'xl' }}
                >
                  <Center>
                    <Box p={10}>
                      <Center>
                        <Image src={`/img/candidate/${isData.candidate.imgCandidate1}`} bg={"white"} style={{ border: "4px solid white" }} radius={"100%"} alt='kandidat 1' h={200} w="auto" />
                      </Center>
                      <Text fw={"bold"} mt={10} ta={"center"} c={"white"}>{isData.candidate.nameCandidate1}</Text>
                      <Text c={"white"} ta={"center"} fz={13}>{tingkat == 1 ? 'CALON GUBERNUR' : 'CALON BUPATI'}</Text>
                    </Box>
                  </Center>
                  <Center>
                    <Box p={10}>
                      <Center>
                        <Image src={`/img/candidate/${isData.candidate.imgCandidate2}`} bg={"white"} style={{ border: "4px solid white" }} radius={"100%"} alt='kandidat 2' h={200} w="auto" />
                      </Center>
                      <Text fw={"bold"} mt={10} ta={"center"} c={"white"}>{isData.candidate.nameCandidate2}</Text>
                      <Text c={"white"} ta={"center"} fz={13}>{tingkat == 1 ? 'CALON WAKIL GUBERNUR' : 'CALON WAKIL BUPATI'}</Text>
                    </Box>
                  </Center>
                </SimpleGrid>
              </Box>
              <Group>

              </Group>
              <Box mt={20}>
                <SimpleGrid
                  cols={{ base: 3, sm: 3, md: 1, lg: 1, xl: 1 }}
                >
                  <Select
                    placeholder="Kandidat 1"
                    data={candidate.map((can: any) => ({
                      value: String(can.id),
                      label: can.name
                    }))}
                    value={isCandidate1}
                    onChange={(val) => {
                      setCandidate1(val)
                      setCandidate2(null)
                    }}
                  />
                  <Select
                    placeholder="Kandidat 2"
                    data={candidate.map((can: any) => ({
                      value: String(can.id),
                      label: can.name,
                      disabled: isCandidate1 == String(can.id) ? true : false
                    }))}
                    value={isCandidate2}
                    onChange={(val) => { setCandidate2(val) }}
                  />
                  <Button fullWidth c={"dark"} bg={"white"} onClick={() => {
                    onGenerate()
                    setArea(null)
                  }}>HASIL</Button>
                </SimpleGrid>
              </Box>

              <Box pt={45}>
                <Text ta={"center"} fz={20} c={"white"}>PROBABILITAS KEBERHASILAN</Text>
              </Box>
              <Box pt={10}>
                <Text ta={"center"} fz={70} fw={"bold"} c={"green"}>{(_.isUndefined(isData.rate) ? '00.00' : isData.rate)} %</Text>
              </Box>
            </Box>

          </Grid.Col>
          <Grid.Col span={{ md: 7, lg: 7 }}>
            <ScrollArea h={"74vh"}>
              {
                isBarChart.map((item: any, i: any) => {
                  return (
                    <Box key={i} mb={30}>
                      <EchartPairingSentiment data={item} />
                    </Box>
                  )
                })
              }
            </ScrollArea>
          </Grid.Col>
        </Grid>

      </Stack>

    </>
  );
}
