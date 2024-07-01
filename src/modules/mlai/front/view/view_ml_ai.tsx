"use client"
import { PageSubTitle } from '@/modules/_global';
import { funGetOneCandidateFront } from '@/modules/candidate';
import { ActionIcon, Box, Button, Container, Divider, Group, Image, Indicator, Menu, ScrollArea, Select, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import TextAnimation from 'react-typing-dynamics';
import { funGetDateMlAiFront, funGetMlAiFront, funGetMlAiFrontV2 } from '../..';
import _ from 'lodash';
import { DateInput, DatePickerProps } from '@mantine/dates';
import moment from 'moment';
import { CiMenuKebab } from 'react-icons/ci';
import { useAtom } from 'jotai';
import { _valReadIdMlai } from '../val/val_mlai';
import Wrapper from '../component/wrapper_read';

export default function ViewMlAi({ dataV2, dataTanggal, candidate, oneCandidate }: { dataV2: any, dataTanggal: any, candidate: any, oneCandidate: any }) {
  const [listCandidate, setListCandidate] = useState(candidate)
  const [isCandidate, setCandidate] = useState(oneCandidate?.id)
  const [isNameCan, setNameCan] = useState(oneCandidate?.name)
  const [isImgCan, setImgCan] = useState(`/img/candidate/${oneCandidate?.img}`)
  const [isDate, setDate] = useState<any>(new Date())
  const [isMonth, setMonth] = useState<any>(moment(new Date().getMonth()).format('MM'))
  const [isListTgl, setListTgl] = useState(dataTanggal)
  const [valRead, setRead] = useAtom(_valReadIdMlai)
  const [dataMlai, setDataMlai] = useState(dataV2.data)
  const [dataJamMlai, setDataJamMlai] = useState(dataV2.dataJam)
  const [isBTime, setBTime] = useState(dataV2.isJam)

  async function changeMonth(value: any) {
    const monthKlik = moment(value).format('MM')
    if (monthKlik != isMonth) {
      setMonth(monthKlik)
      const loadTgl = await funGetDateMlAiFront({ candidate: isCandidate, date: value })
      setListTgl(loadTgl)
    }
  }

  async function chooseCandidate(value: any) {
    setCandidate((value == null) ? oneCandidate?.id : value)
    const dataDB = await funGetMlAiFrontV2({ candidate: value, date: isDate })
    const dataCan = await funGetOneCandidateFront({ candidate: value })
    const loadTgl = await funGetDateMlAiFront({ candidate: isCandidate, date: isDate })
    setListTgl(loadTgl)
    setDataMlai(dataDB?.data)
    setDataJamMlai(dataDB?.dataJam)
    setBTime(dataDB?.isJam)
    setNameCan((dataCan?.name))
    setImgCan(`/img/candidate/${dataCan?.img}`)
  }

  const dayRenderer: DatePickerProps['renderDay'] = (date) => {
    const coba = moment(date).format('YYYY-MM-DD')
    const day = date.getDate()
    const muncul = isListTgl.includes(coba)
    return (
      <Indicator size={6} radius="xs" label={<Divider my="md" />} position="bottom-center" color="green" offset={-2} disabled={!muncul}>
        <div>{day}</div>
      </Indicator>
    );
  };

  async function chooseDate(value: any) {
    setDate(value)
    const dataDB = await funGetMlAiFrontV2({ candidate: isCandidate, date: value })
    setDataMlai(dataDB?.data)
    setDataJamMlai(dataDB?.dataJam)
    setBTime(dataDB?.isJam)
  }



  async function chooseTime(value: any) {
    setBTime(value)
    const dataLoad = await funGetMlAiFrontV2({ candidate: isCandidate, date: isDate, time: value })
    setDataMlai(dataLoad?.data)
  }

  useEffect(() => {
    setDataMlai(dataV2.data)
  }, [dataV2])

  return (
    <>
      <PageSubTitle text1='REKOMENDASI' text2='ML-AI' />
      <Box pt={20}>
        <Box
        >
          <Image src={isImgCan} bg={"white"} style={{ border: "4px solid white" }} radius={"100%"} alt='Kandidat' maw={200} mx="auto" />
          <Container px={0} size="15rem" mt={20}>
            <Select
              placeholder="Kandidat"
              data={listCandidate.map((can: any) => ({
                value: String(can.id),
                label: can.name
              }))}
              value={isCandidate}
              onChange={(val) => chooseCandidate(val)}
            />
          </Container>
        </Box>
        <Text mt={20} c={"green"} fz={20} fw={"bold"}>PENINGKATAN ANALISIS KEKUATAN</Text>
        <Box pt={20}>
          <Box
            style={{
              background: "rgba(0,0,0,0.3)",
              padding: 30,
              borderRadius: 10
            }}
          >
            <Box>
              <Box>
                <Group >
                  <DateInput
                    variant="filled"
                    placeholder="SELECT DATE"
                    maxDate={new Date()}
                    value={isDate}
                    onChange={(val) => {
                      chooseDate(val)
                    }}
                    renderDay={dayRenderer}
                    onDateChange={(val) => { changeMonth(val) }}
                  />
                  {
                    dataJamMlai.slice(0, 5).map((item: any, i: any) => {
                      return (
                        <div key={i}>
                          <Button color="indigo" w={100} variant={(isBTime == item.timeContent) ? 'filled' : 'outline'}
                            onClick={() => {
                              chooseTime(item.timeContent)
                            }}
                          >
                            {item.timeContent}
                          </Button>
                        </div>
                      )
                    })
                  }
                  {dataJamMlai.length > 5 &&
                    <Group>
                      <Menu shadow="md" width={200} position="right-start">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="rgba(255, 255, 255, 1)" aria-label="Settings">
                            <CiMenuKebab style={{ width: '70%', height: '70%' }} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown pb={0}>
                          <ScrollArea h={100}>
                            {
                              dataJamMlai.slice(5, dataJamMlai.length).map((item: any, i: any) => {
                                return (
                                  <Menu.Item mb={5} bg={(isBTime == item.timeContent) ? 'indigo' : "#230D37"} key={i}
                                    onClick={() => { chooseTime(item.timeContent) }}
                                  >
                                    <Text ta={"center"} c={"white"} fz={16}>
                                      {item.timeContent}
                                    </Text>
                                  </Menu.Item>
                                )
                              })
                            }
                          </ScrollArea>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  }
                </Group>
              </Box>
              <ScrollArea h={"34vh"} pt={20}>
                <Box>
                  {dataMlai && dataMlai.map((item: any, i: any) => {
                    return (
                      <Box key={i} >
                        {
                          item.idRequestMlAi != null && (
                            <>
                              <Box style={{
                                borderLeftColor: 'green',
                                borderLeftStyle:'solid',
                                borderLeftWidth: 4,
                                paddingLeft: 15,
                                paddingRight: 10,
                                paddingTop: 5,
                                paddingBottom: 5,
                              }}>
                                <Group>
                                  <Box>
                                    <Text c={'white'} mb={15} fw={"bold"}>REQUEST</Text>
                                    <Text c={'white'}>{item.request}</Text>
                                  </Box>

                                </Group>
                              </Box>
                              <Text mt={20} fw={"bold"} c={'white'}>RESPONS</Text>
                            </>
                          )
                        }

                        {
                          valRead.includes(item.id) ? (
                            <>
                              <Box c={"white"} dangerouslySetInnerHTML={{ __html: item.content }} />
                            </>
                          ) : (
                            <Wrapper id={item.id}>
                              <Text c={"white"}>
                                <TextAnimation
                                  phrases={[...item.content.split('\n')]}
                                  typingSpeed={0}
                                  backspaceDelay={0}
                                  eraseDelay={0}
                                  timeComplete={0}
                                  errorProbability={0}
                                  eraseOnComplete={false}
                                  isSecure={false}
                                />
                              </Text>
                            </Wrapper>
                          )}
                      </Box>
                    )
                  })}
                </Box>
              </ScrollArea>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

