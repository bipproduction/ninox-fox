"use client"
import { PageSubTitle } from '@/modules/_global';
import { BackgroundImage, Box, Center, Flex, Grid, Group, Image, SimpleGrid, Stack } from '@mantine/core';
import React, { useState } from 'react';
import CandidateSummary from '../component/candidate_summary';
import EchartCandidateSummary from '../component/echart_candidate_summary';
import TableTop10 from '../component/table_top_10';
import TopPairingCandidate from '../component/top_pairing_candidate';
import NewChartCandidate from '../component/new_chart_candidate';
import NewTableTop10Dummy from '../component/new_table_top10_dummy';
import NewTableTop10 from '../component/new_table_top_10';

export default function ViewSummary({ oneCandidate, tingkat, emoTable, emoPersen, emoChart, locked, pairingCandidate }: { oneCandidate: any, tingkat: any, emoTable: any, emoPersen: any, emoChart: any, locked: any, pairingCandidate: any }) {

  return (
    <>
      <PageSubTitle text1='GRAFIK' text2='SPEKTRUM SENTIMEN' />
      {/* <BackgroundImage src='/bg_emotion.png' mih={"100%"} radius={20}> */}
      <Stack pt={20}>

        <Grid gutter={40}>
          <Grid.Col span={{ base: 5, md: 4, lg: 5, xl: 5 }} style={{ zIndex: 100 }}>
            <CandidateSummary candidate={oneCandidate} persen={emoPersen} />
          </Grid.Col>
          <Grid.Col span={{ base: 1, md: 3, lg: 2, xl: 2 }}>
            <Center>
              <Image src={"/dunia.png"} alt='bg' h={"45vh"}
                w="auto" opacity={0.5} />
            </Center>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 5, lg: 5 }} style={{ zIndex: 100 }}>
            <EchartCandidateSummary data={emoChart} candidate={oneCandidate} />
            {/* <NewChartCandidate /> */}
          </Grid.Col>
        </Grid>
      </Stack>
      {/* </BackgroundImage> */}
      <Box pt={10}>
        {/* <TableTop10 emotion={emoTable} tingkat={oneCandidate?.tingkat} locked={locked} /> */}
        {/* <NewTableTop10Dummy /> */}
        <NewTableTop10 emotion={emoTable} tingkat={oneCandidate?.tingkat} locked={locked} />
      </Box>
      <Box pt={30}>
        <TopPairingCandidate pairingCandidate={pairingCandidate} tingkat={tingkat} />
      </Box>
    </>
  );
}
{/* <Image src={"/pngwing.com.png"} alt='bg' h={"33vh"}
                w="auto" /> */}