"use client"
import { PageSubTitle } from '@/modules/_global';
import { Box, Flex, Grid, Image, ScrollArea, Select, Stack, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import _ from 'lodash';
import React, { useState } from 'react';
import TextAnimation from 'react-typing-dynamics';
import { funGetSwotFront } from '../..';
import { funGetOneCandidateFront } from '@/modules/candidate';

export default function ViewSwot({ data, candidate, oneCandidate }: { data: any, candidate: any, oneCandidate: any }) {
  const [isData, setData] = useState<any>(data)
  const [listCandidate, setListCandidate] = useState(candidate)
  const [isCandidate, setCandidate] = useState(oneCandidate?.id)
  const [isNameCan, setNameCan] = useState(oneCandidate?.name)
  const [isImgCan, setImgCan] = useState(`/img/candidate/${oneCandidate?.img}`)

  useShallowEffect(() => {
    // const group = _.groupBy(
    //   data, (v) => v.category
    // )
    setData(data)
  }, [data])

  async function chooseCandidate(value: any) {
    setData([])
    setCandidate((value == null) ? oneCandidate?.id : value)
    const dataDB = await funGetSwotFront({ candidate: value })
    const dataCan = await funGetOneCandidateFront({ candidate: value })
    // const grouping = _.groupBy(
    //   dataDB, (v) => v.category
    // )
    setData(dataDB)
    setNameCan((dataCan?.name))
    setImgCan(`/img/candidate/${dataCan?.img}`)
  }

  const arrayKey = ['STRENGTH', 'WEAKNESS', 'OPPORTUNITY', 'THREAT']

  return (
    <>
      {/* <PageSubTitle text1='SWOT' text2='EVALUATION' /> */}
      <PageSubTitle text1='ANALISA' text2='SWOT' />
      <Grid gutter={30}>
        <Grid.Col span={{ md: 3, lg: 3 }}>
          <Flex justify={"center"} align={"center"} h={{ base: '40vh', xl: '80vh', lg: '80vh', md: '80vh' }}>
            <Box
              w={{ base: 300, sm: 400 }}
            >
              <Box
                style={{
                  // background: "rgba(0,0,0,0.3)",
                  padding: 10,
                  borderRadius: 10
                }}
                bg={{ base: '', xl: 'rgba(0,0,0,0.3)', lg: 'rgba(0,0,0,0.3)', md: 'rgba(0,0,0,0.3)' }}
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
            {/* {
              arrayKey.map((item: any, i: any) => (
                <Box key={i} pb={20}>
                  <Box
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      padding: 10,
                      borderRadius: 10,
                      minHeight: 150
                    }}
                  >
                    <Box pb={10}>
                      <Text fw={"bold"} c={"green"}>{item}</Text>
                    </Box>
                    {(() => {
                      if (!_.isEmpty(isData) && !_.isUndefined(isData[item])) {
                        const datanya = isData[item]
                        return (
                          <>
                            <ScrollArea h={150} w={"a"}>
                              <Stack pl={10}>
                                <Text c={"white"} fz={14}>
                                  <TextAnimation
                                    phrases={[...datanya[_.random(0, datanya.length - 1)].content.split('\n')]}
                                    typingSpeed={(i == 0) ? 0 : Number(datanya.id ? Math.floor(Math.random() * 1 + 0) : Math.floor(Math.random() * 1 + 5))}
                                    backspaceDelay={Number(datanya.id ? Math.floor(Math.random() * 899999 + 100000) : Math.floor(Math.random() * 899999 + 100000))}
                                    eraseDelay={Number(datanya.id ? Math.floor(Math.random() * 899999 + 100000) : Math.floor(Math.random() * 899999 + 100000))}
                                    timeComplete={Number(datanya.id ? Math.floor(Math.random() * 899999 + 100000) : Math.floor(Math.random() * 899999 + 100000))}
                                    errorProbability={Number(datanya.id ? 0 : 0.1)}
                                    eraseOnComplete={false}
                                    isSecure={false}
                                  />
                                </Text>
                              </Stack>
                            </ScrollArea>
                          </>
                        )
                      }

                    })()}
                  </Box>
                </Box>
              ))
            } */}
            {
              _.keys(isData).map((item: any, i: any) => (
                <Box key={i} pb={20}>
                  <Box
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      padding: 10,
                      borderRadius: 10,
                      minHeight: 150
                    }}
                  >
                    <Box pb={10}>
                      <Text fw={"bold"} c={"green"}>{_.upperCase(item)}</Text>
                    </Box>
                    {(() => {
                      const datanya = isData[item]
                      if (!_.isEmpty(datanya))
                        return (
                          <>
                            <ScrollArea h={150} w={"a"}>
                              <Stack pl={10}>
                                <Text c={"white"} fz={14}>
                                  <TextAnimation
                                    phrases={[...datanya[_.random(0, datanya.length - 1)].content.split('\n')]}
                                    typingSpeed={(i == 0) ? 0 : Number(datanya.id ? Math.floor(Math.random() * 1 + 0) : Math.floor(Math.random() * 1 + 5))}
                                    backspaceDelay={Number(datanya.id ? Math.floor(Math.random() * 899999 + 100000) : Math.floor(Math.random() * 899999 + 100000))}
                                    eraseDelay={Number(datanya.id ? Math.floor(Math.random() * 899999 + 100000) : Math.floor(Math.random() * 899999 + 100000))}
                                    timeComplete={Number(datanya.id ? Math.floor(Math.random() * 899999 + 100000) : Math.floor(Math.random() * 899999 + 100000))}
                                    errorProbability={Number(datanya.id ? 0 : 0.1)}
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
                </Box>
              ))
            }
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </>
  );
}
