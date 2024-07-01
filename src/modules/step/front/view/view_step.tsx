"use client"
import { PageSubTitle } from '@/modules/_global';
import { Box, Flex, Grid, Image, ScrollArea, Select, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import _ from 'lodash';
import React, { useState } from 'react';
import TextAnimation from 'react-typing-dynamics';
import { funGetStepFront } from '../..';
import { funGetOneCandidateFront } from '@/modules/candidate';

export default function ViewStep({ data, candidate, oneCandidate }: { data: any, candidate: any, oneCandidate: any }) {
  const [isData, setData] = useState(data)
  const [listCandidate, setListCandidate] = useState(candidate)
  const [isCandidate, setCandidate] = useState(oneCandidate?.id)
  const [isNameCan, setNameCan] = useState(oneCandidate?.name)
  const [isImgCan, setImgCan] = useState(`/img/candidate/${oneCandidate?.img}`)


  async function chooseCandidate(value: any) {
    setData([])
    setCandidate((value == null) ? oneCandidate?.id : value)
    const dataDB = await funGetStepFront({ candidate: value })
    const dataCan = await funGetOneCandidateFront({ candidate: value })
    setData(dataDB)
    setNameCan((dataCan?.name))
    setImgCan(`/img/candidate/${dataCan?.img}`)
  }

  return (
    <>
      <PageSubTitle text1='ANALISA' text2='STEP' />
      <Grid gutter={30}>
        <Grid.Col span={{ md: 3, lg: 3 }}>
          <Flex justify={"center"} align={"center"} h={{base: '40vh', xl: '80vh', lg: '80vh', md: '80vh'}}>
            <Box
              w={{ base: 300, sm: 400 }}
            >
              <Box
                style={{
                 
                  padding: 10,
                  borderRadius: 10
                }}
                bg={{base: '', xl: 'rgba(0,0,0,0.3)', lg: 'rgba(0,0,0,0.3)', md: 'rgba(0,0,0,0.3)'}}
              >
                <Image src={isImgCan} bg={"white"} style={{ border: "4px solid white" }} radius={"100%"} alt='kandidat' maw={200} mx="auto" />
                <Text fw={"bold"} ta={"center"} c={"white"} mt={10}>{isNameCan}</Text>
              </Box>
              <Select
                mt={10}
                placeholder="Kandidat"
                data={listCandidate.map((can: any) => ({
                  value: String(can.id),
                  label: can.name
                }))}
                value={isCandidate}
                onChange={(val) => chooseCandidate(val)}
              />
            </Box>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ md: 9, lg: 9 }}>
          <ScrollArea h={"85vh"}>
            {!_.isEmpty(isData) ? (
              <>
                {
                  _.keys(isData).map((v, i) => (
                    <Box key={i} pb={20}>
                      <Text fw={"bold"} c={"white"} fz={25} >{_.upperCase(v)}</Text>
                      <SimpleGrid
                        cols={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
                        spacing={{ base: 10, sm: 'xl' }}
                        verticalSpacing={{ base: 'md', sm: 'xl' }}
                      >
                        <Box
                          style={{
                            background: "rgba(0,0,0,0.3)",
                            padding: 10,
                            borderRadius: 10
                          }}
                          h={250}
                        >
                          <Box pb={10}>
                            <Text fw={"bold"} c={"green"}>POSITIF</Text>
                          </Box>
                          {(() => {
                            const datanya = _.groupBy(
                              isData[v],
                              (v3) => v3.sentiment
                            )["1"];

                            if (!datanya) return <></>;
                            return (
                              <>
                                <ScrollArea h={200}>
                                  <Stack pl={10}>
                                    <Text c={"white"} fz={14}>
                                      <TextAnimation
                                        phrases={[...datanya[_.random(0, datanya.length - 1)].content.split('\n')]}
                                        typingSpeed={(i == 0) ? 0 : Number(datanya.length - 1 ? Math.floor(Math.random() * 1 + 0) : Math.floor(Math.random() * 1 + 5))}
                                        backspaceDelay={Number(datanya.length - 1 ? Math.floor(Math.random() * 899999 + 100000) : Math.floor(Math.random() * 899999 + 100000))}
                                        eraseDelay={Number(datanya.length - 1 ? Math.floor(Math.random() * 899999 + 100000) : Math.floor(Math.random() * 899999 + 100000))}
                                        timeComplete={Number(datanya.length - 1 ? Math.floor(Math.random() * 899999 + 100000) : Math.floor(Math.random() * 899999 + 100000))}
                                        errorProbability={Number(datanya.length - 1 ? 0 : 0.1)}
                                        eraseOnComplete={false}
                                        isSecure={false}
                                      />
                                    </Text>
                                  </Stack>
                                </ScrollArea>
                              </>
                            )
                          })()}
                        </Box>
                        <Box
                          style={{
                            background: "rgba(0,0,0,0.3)",
                            padding: 10,
                            borderRadius: 10
                          }}
                          h={250}
                        >
                          <Box pb={10}>
                            <Text fw={"bold"} c={"red"}>NEGATIF</Text>
                          </Box>
                          {(() => {
                            const datanya = _.groupBy(
                              isData[v],
                              (v3) => v3.sentiment
                            )["2"];

                            if (!datanya) return <></>;
                            return (
                              <>
                              {/* <Stack c={"red"}>
                                <pre>
                                {JSON.stringify(datanya, null, 1)}
                                </pre>
                              </Stack> */}
                                <ScrollArea h={200}>
                                  <Stack pl={10}>
                                    <Text c={"white"} fz={14}>
                                      <TextAnimation
                                        phrases={[...datanya[_.random(0, datanya.length - 1)].content.split('\n')]}
                                        typingSpeed={0}
                                        backspaceDelay={1000}
                                        eraseDelay={0}
                                        timeComplete={3000}
                                        errorProbability={0.3}
                                        eraseOnComplete={false}
                                        isSecure={false}
                                      />
                                    </Text>
                                  </Stack>
                                </ScrollArea>
                              </>
                            )
                          })()}
                        </Box>
                      </SimpleGrid>
                    </Box>
                  ))
                }
              </>
            )
              : (
                <Text c={"white"}></Text>
              )}
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </>
  );
}
