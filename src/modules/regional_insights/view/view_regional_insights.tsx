"use client"
import { Box, Button, Grid, Group, Image, rem, Select, Stack, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import EchartSentimentAnalysis from '../components/echart_sentiment_analysis';
import EchartPublicConcerns from '../components/echart_public_concerns';
import EchartLeader from '../components/echart_leader';
import { useRouter } from 'next/navigation';
import { Glitch, PageSubTitle, WARNA } from '@/modules/_global';
import { funGetEmotionRegionalInsight, funGetEmotionRegionalInsightNew } from '..';
import _ from 'lodash';
import { useHeadroom } from '@mantine/hooks';
import { useAtom } from 'jotai';
import { isDetactionNavbar } from '../val/isDetectionNavbar';
import toast from 'react-simple-toasts';

export default function ViewRegionalInsights({ oneCandidate, candidate, emotion, audience, pct, lta }: { oneCandidate: any, candidate: any, emotion: any, audience: any, pct: any, lta: any }) {
  const router = useRouter()
  const [listCandidate, setListCandidate] = useState(candidate)
  const [isCandidate, setCandidate] = useState(oneCandidate?.id == null ? candidate[0]?.id : oneCandidate.id)
  const [isData, setData] = useState(emotion)
  const [isGlitch, setGlitch] = useState(false)

  const [isDetection, setDetection] = useAtom(isDetactionNavbar)
  const pinned = useHeadroom({ fixedAt: 120 });

  async function onGenerate() {
    if (isCandidate == null || isCandidate == undefined) {
      setGlitch(true)
      await new Promise((r) =>
        setTimeout(r, 300)
      )
      setGlitch(false)
      return toast("Silahkan pilih kandidat", { theme: "light", position: 'center', })
    }
    const dataLoad = await funGetEmotionRegionalInsightNew({ candidate: isCandidate })
    setData(dataLoad)
  }


  return (
    <>
      {isGlitch && <Glitch/>}
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
        <PageSubTitle text1='WAWASAN' text2='REGIONAL' />
        <Box>
          <Group justify='flex-end'>
            <Select
              placeholder="Kandidat"
              data={listCandidate.map((can: any) => ({
                value: String(can.id),
                label: can.name
              }))}
              value={isCandidate}
              onChange={(val) => setCandidate(val)}
            />
            <Button c={"dark"} bg={"white"} onClick={onGenerate}>HASIL</Button>
          </Group>
        </Box>
      </Box>
      <Stack pt={`calc(${rem(120)} + var(--mantine-spacing-md))`}>
        {isData && isData.map((item: any, i: any) => {
          return (
            <Box key={item.id} pt={20}>
              <Group justify='space-between' pb={10}>
                <Text fz={26} fw={"bold"} c={"white"}>{_.upperCase(item.name)}</Text>
                <Box>
                  <Button w={130} c={"dark"} bg={"white"} onClick={() => router.push("/insights/" + isCandidate + "/" + item.id + "")}>DETAIL</Button>
                </Box>
              </Group>
              <EchartSentimentAnalysis dataEmotion={item} dataLocked={audience} />
              <Grid gutter={30} pt={20} pb={30}>
                <Grid.Col span={{ md: 8, lg: 8 }}>
                  <EchartPublicConcerns dataPct={pct.filter((v: any) => v.idArea === item.id)} />
                </Grid.Col>
                <Grid.Col span={{ md: 4, lg: 4 }}>
                  <EchartLeader dataLta={lta.filter((v: any) => v.idArea === item.id)} />
                </Grid.Col>
              </Grid>
            </Box>
          )
        })}
      </Stack>

    </>
  );
}
