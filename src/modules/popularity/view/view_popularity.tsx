"use client"
import { Box, Button, Center, Flex, Grid, Group, Image, rem, Select, SimpleGrid, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import EchartPopularityLine from '../components/echart_popularity_line';
import EchartPopularityPie from '../components/echart_popularity_pie';
import { Glitch, PageSubTitle, WARNA } from '@/modules/_global';
import _ from 'lodash';
import { funGetPopularityToday, funGetPopularityTodayNew, funGetRateChart } from '..';
import moment from 'moment';
import EchartPopularityBarDummy from '../components/echart_popularity_bar_dummy';
import EchartPopularityBar from '../components/echart_popularity_bar';
import { useAtom } from 'jotai';
import { useHeadroom } from '@mantine/hooks';
import { isDetactionNavbar } from '@/modules/regional_insights';
import toast from 'react-simple-toasts';

export default function ViewPopularity({ candidate, pairingToday, chartRate, tingkat }: { candidate: any, pairingToday: any, chartRate: any, tingkat: any }) {
  const [isPairingToday, setPairingToday] = useState(pairingToday)
  const [isCandidate1, setCandidate1] = useState(pairingToday.pairingCandidate.idCandidate1)
  const [isCandidate2, setCandidate2] = useState(pairingToday.pairingCandidate.idCandidate2)
  const [isPieChart, setPieChart] = useState(isPairingToday.chart)
  const [isRateChart, setRateChart] = useState(chartRate)
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
    const data = await funGetPopularityTodayNew({ candidate1: isCandidate1, candidate2: isCandidate2 })
    setPairingToday(data)
    setPieChart(data.chart)

    const dataRate = await funGetRateChart({
      candidate1: data.pairingCandidate.idCandidate1,
      candidate2: data.pairingCandidate.idCandidate2,
      startDate: moment(new Date()).subtract(7, "days").format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD")
    })

    setRateChart(dataRate)
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
          height: isDetection ? rem(185) : rem(145),
          zIndex: 20,
          transform: `translate3d(0, ${pinned ? 0 : isDetection ? rem(-185) : rem(-145)}, 0)`,
          transition: 'transform 400ms ease',
          backgroundColor: WARNA.ungu,
        }}
        left={isDetection ? 250 : 100}
      >
        <PageSubTitle text1='PENILAIAN' text2='SENTIMEN PEMILIH' />
        <Group justify='flex-end' pt={10}>
          <SimpleGrid
            cols={{ base: 1, sm: 3, lg: 3 }}
            spacing={{ base: 10, sm: 'xl' }}
          >
            <Select
              placeholder="Kandidat 1"
              data={candidate.map((can: any) => ({
                value: String(can.id),
                label: can.name,
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
            <Button fullWidth bg={"white"} c={"dark"} onClick={onGenerate}>HASIL</Button>
          </SimpleGrid>
        </Group>
      </Box>
      <Box pt={`calc(${rem(120)} + var(--mantine-spacing-md))`}>
        <Grid gutter={'lg'}>
          <Grid.Col span={{ md: 6, lg: 6 }}>
            <Box
            >
              <Group justify='space-around' gap={30} pt={65}>
                <Center>
                  <Box>
                    <Center>
                      <Image src={`/img/candidate/${isPairingToday.pairingCandidate.imgCandidate1}`} bg={"white"} style={{ border: "4px solid white" }} radius={"100%"} alt="kandidat 1" h={200} w="auto" />
                    </Center>
                    <Text mt={20} c={"white"} ta={"center"} fw={'bold'}>{isPairingToday.pairingCandidate.nameCandidate1}</Text>
                    <Text c={"white"} ta={"center"} fz={13}>{tingkat == 1 ? 'CALON GUBERNUR' : 'CALON BUPATI'}</Text>
                  </Box>
                </Center>
                <Center>
                  <Box>
                    <Center>
                      <Image src={`/img/candidate/${isPairingToday.pairingCandidate.imgCandidate2}`} bg={"white"} style={{ border: "4px solid white" }} radius={"100%"} alt="kandidat 2" h={200} w="auto" />
                    </Center>
                    <Text mt={20} c={"white"} ta={"center"} fw={'bold'}>{isPairingToday.pairingCandidate.nameCandidate2}</Text>
                    <Text c={"white"} ta={"center"} fz={13}>{tingkat == 1 ? 'CALON WAKIL GUBERNUR' : 'CALON WAKIL BUPATI'}</Text>
                  </Box>
                </Center>
              </Group>

            </Box>
          </Grid.Col>
          <Grid.Col span={{ md: 6, lg: 6 }}>
            <Box pt={50}>
              <Text ta={"center"} c={"white"} fw={"bold"} fz={30}>PROBABILITAS KEBERHASILAN</Text>
              <Text ta={"center"} c={"#228be6"} fw={"bold"} fz={120}>{(_.isUndefined(isPairingToday.rate) ? '00.00' : isPairingToday.rate)} %</Text>
            </Box>
          </Grid.Col>
        </Grid>
        <Grid >
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <EchartPopularityLine data={isRateChart} candidate={isPairingToday.pairingCandidate} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            {/* <EchartPopularityPie data={isPieChart} /> */}
            {/* <EchartPopularityBarDummy/> */}
            <EchartPopularityBar dataEmotion={isPieChart} />
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
}
