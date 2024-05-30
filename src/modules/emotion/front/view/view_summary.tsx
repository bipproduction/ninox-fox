"use client"
import { PageSubTitle } from '@/modules/_global';
import { BackgroundImage, Box, Center, Flex, Grid, Group, Image, SimpleGrid, Stack } from '@mantine/core';
import React, { useState } from 'react';
import CandidateSummary from '../component/candidate_summary';
import EchartCandidateSummary from '../component/echart_candidate_summary';
import TableTop10 from '../component/table_top_10';
import TopPairingCandidate from '../component/top_pairing_candidate';
import NewTableTop10 from '../component/new_table_top10';
import NewChartCandidate from '../component/new_chart_candidate';

export default function ViewSummary({ oneCandidate, emoTable, emoPersen, emoChart, locked, pairingCandidate }: { oneCandidate: any, emoTable: any, emoPersen: any, emoChart: any, locked: any, pairingCandidate: any }) {

  return (
    <>
      <PageSubTitle text1='GRAFIK' text2='SPEKTRUM SENTIMEN' />
      {/* <BackgroundImage src='/bg_emotion.png' mih={"100%"} radius={20}> */}
      <Stack pt={20}>

        <Grid gutter={40}>
          <Grid.Col span={{ base: 4, md: 4, lg: 4 }} style={{zIndex: 100}}>
            <CandidateSummary candidate={oneCandidate} persen={emoPersen} />
          </Grid.Col>
          <Grid.Col span={{ base: 3, md: 3, lg: 3 }}>
            <Center>
              <Image src={"/dunia.png"} alt='bg' h={"45vh"}
                w="auto"  opacity={0.5}/>
            </Center>
          </Grid.Col>
          <Grid.Col span={{ base: 5, md: 5, lg: 5 }} style={{zIndex: 100}}>
            {/* <EchartCandidateSummary data={emoChart} candidate={oneCandidate} /> */}
            <NewChartCandidate />
          </Grid.Col>
        </Grid>
      </Stack>
      {/* </BackgroundImage> */}
      <Box pt={10}>
        {/* <TableTop10 emotion={emoTable} tingkat={oneCandidate?.tingkat} locked={locked} /> */}
        <NewTableTop10 />
      </Box>
      <Box pt={30}>
        <TopPairingCandidate pairingCandidate={pairingCandidate} />
      </Box>
    </>
  );
}
{/* <Image src={"/pngwing.com.png"} alt='bg' h={"33vh"}
                w="auto" /> */}