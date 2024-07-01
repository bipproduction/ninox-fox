'use client'
import { PageSubTitle } from '@/modules/_global';
import { WARNA } from '@/modules/_global/fun/WARNA';
import { Box, Center, Flex, Grid, Group, Image, SimpleGrid, Text } from '@mantine/core';
import React from 'react';
import EchartTopPairingCandidate from './echart_top_pairing_candidate';

export default function TopPairingCandidate({ pairingCandidate, tingkat }: { pairingCandidate: any, tingkat: any }) {
    return (
        <>
            <Box>
                <Box>
                    <PageSubTitle text1='PASANGAN KANDIDAT' text2='TERATAS' />
                    <SimpleGrid
                        cols={{ base: 1, sm: 1, md: 1, lg: 2 }}
                        spacing={{ base: 10, sm: 'xl' }}
                        pt={10}
                    >
                        {pairingCandidate.map((item: any, i: any) => {
                            return (
                                <Box key={i}>
                                    <Box style={{
                                        backgroundColor: "rgba(0,0,0,0.3)",
                                        borderRadius: 10,
                                        padding: 10
                                    }}>
                                        <Grid gutter={0}>
                                            <Grid.Col span={{ sm: 12, md: 12, lg: 12 }}>
                                                <Box pt={"3vh"}>
                                                    <Group gap={100} justify='center'>
                                                        <Center>
                                                            <Box>
                                                                <Image alt='Kandidat 1' src={`/img/candidate/${item.imgCandidate1}`} bg={"white"} style={{ border: "2px solid white" }} radius={"100%"} maw={150} mx="auto" />
                                                                <Text c={'white'} ta={"center"} mt={15} fw={'bold'} fz={15}>{item.nameCandidate1}</Text>
                                                                <Text c={'white'} ta={"center"} fz={13} mt={5} >{tingkat == 1 ? 'CALON GUBERNUR' : 'CALON BUPATI'}</Text>
                                                            </Box>
                                                        </Center>
                                                        <Center>
                                                            <Box>
                                                                <Image alt='Kandidat 2' src={`/img/candidate/${item.imgCandidate2}`} bg={"white"} style={{ border: "2px solid white" }} radius={"100%"} maw={150} mx="auto" />
                                                                <Text c={'white'} ta={"center"} mt={15} fw={'bold'} fz={15}>{item.nameCandidate2}</Text>
                                                                <Text c={'white'} ta={"center"} mt={5} fz={13}>{tingkat == 1 ? 'CALON WAKIL GUBERNUR' : 'CALON WAKIL BUPATI'}</Text>
                                                            </Box>
                                                        </Center>
                                                    </Group>
                                                </Box>
                                                <Box pt={20}>
                                                    <Text ta={"center"} c={"white"} fw={"bold"} fz={50}>{item.rate} %</Text>
                                                </Box>

                                            </Grid.Col>
                                            <Grid.Col span={{ sm: 12, md: 12, lg: 12 }}>
                                                <EchartTopPairingCandidate candidate1={item.idCandidate1} candidate2={item.idCandidate2} />
                                            </Grid.Col>
                                        </Grid>
                                    </Box>
                                </Box>
                            )
                        })}

                    </SimpleGrid>
                </Box>
            </Box>
        </>
    );
}
