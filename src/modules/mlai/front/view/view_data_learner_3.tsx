"use client"
import { PageSubTitle } from '@/modules/_global';
import { Anchor, Box, Button, Divider, Group, rem, ScrollArea, SimpleGrid, Spoiler, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { GiBackwardTime } from "react-icons/gi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import _ from "lodash"
import { useElementSize } from '@mantine/hooks';
import TextAnimation from 'react-typing-dynamics';
import funAddRequestMlAiFront from '../fun/add_request_mlai';
import funGetLogRequestMlaiFront from '../fun/get_log_request_mlai_front';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import CobaScroll from '../component/coba_scroll';
import { RESPONSE_MLAI } from '../val/val_respon_mlai';
import { ScrollLoaderExternalState } from 'next-scroll-loader';
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import mtqq_client from "../../../_global/util/mqtt_client"

export default function ViewDataLearner3() {
  const router = useRouter()
  const { ref, width, height } = useElementSize()
  const [response, setResponse] = useState('')
  const [request, setRequest] = useState('')


  async function loadLog({ page }: { page: any }) {
    const load = await funGetLogRequestMlaiFront({ page: page })
    setListScrollData(load)
  }

  async function onProses({ page }: { page: any }) {
    setResponse('')
    if (request == '' || request == null || request == undefined) {
      return setResponse('Silahkan isi form request')
    }

    const ins = await funAddRequestMlAiFront({ request: request })
    if (ins.success === true) {
      setRequest('')
      await new Promise((r) =>
        setTimeout(r, 500)
      )
      setResponse(RESPONSE_MLAI[Math.floor(Math.random() * 5)])
      loadLog({ page: page })
    } else {
      setResponse('Error, silakan coba lagi nanti')
    }
  }

  const [listScrollData, setListScrollData] = useState<any[]>([])
  const [scrollPage, setScrollPage] = useState(1)


  const ScrollItem = ({ dataScroll, page }: { dataScroll: any, page: any }) => {
    const [dataScr, setDataScr] = useState<{ [key: string]: any }>(dataScroll)
    const [showMore, setShowMore] = useState(false);

    return <Box>
      <Box style={{
        cursor: "pointer"
      }} key={dataScr.id}
        onClick={() => {
          if (dataScr.status == 1) {
            router.push('/ml-ai')
          }
        }
        }
      >
        {dataScr.request.length > 150 ? (
          showMore ? (
            <Box>
              <Text c={dataScr.status == 0 ? '#CE9E23' : '#2CCC1E'}>{dataScr.request}</Text>
              <Group gap={3} style={{ alignItems: "center" }}>
                <Anchor c={'blue'} onClick={() => setShowMore(false)} style={{ display: 'flex', alignItems: 'center' }}>
                  Hide
                  <HiChevronUp size={25} />
                </Anchor>
              </Group>
            </Box>
          ) : (
            <Box>
              <Text c={dataScr.status == 0 ? '#CE9E23' : '#2CCC1E'}>{dataScr.request.substring(0, 150) + '...'}</Text>
              <Group gap={3} style={{ alignItems: "center" }}>
                {/* <Anchor c={'blue'} onClick={() => setShowMore(true)}>
                  Show more
                  <HiChevronDown size={25} />
                </Anchor> */}
                <Anchor c={'blue'} onClick={() => setShowMore(true)} style={{ display: 'flex', alignItems: 'center' }}>
                  Show more
                  <HiChevronDown size={25} />
                </Anchor>
              </Group>
            </Box>
          )
        ) : (
          <Box>
            <Text c={dataScr.status == 0 ? '#CE9E23' : '#2CCC1E'}>{dataScr.request}</Text>
          </Box>
        )}
        <Group justify='space-between' style={{
          alignItems: "center",
          alignContent: "center"
        }}>
          <Text c={'#D0CFCF'} fz={13}>{moment(dataScr.createdAt).format('LLL')}</Text>
          <Group gap={5} mt={10} style={{
            alignItems: "center",
            alignContent: "center"
          }}>
            {
              dataScr.status == 0
                ? <GiBackwardTime size={25} color={'#CE9E23'} />
                : <IoIosCheckmarkCircleOutline size={25} color={'#2CCC1E'} />
            }
            <Text c={dataScr.status == 0 ? '#CE9E23' : '#2CCC1E'} fz={13}>{dataScr.status == 0 ? 'Pending' : 'Terjawab'}</Text>
          </Group>
        </Group>
        <Divider my="md" color={'#6E6C68'} />
      </Box>
    </Box>
  }


  useEffect(() => {
    mtqq_client.on("connect", () => {
      mtqq_client.subscribe("app_ninox_fox_reload")
    })

    mtqq_client.on("message", (topic, message) => {
      const data = JSON.parse(message.toString())
      if (data.role == 'user' && data.page == 'data-learner') {
        loadLog({ page: scrollPage })
      }
    })
  }, [])

  return (
    <>
      <PageSubTitle text1='DATA' text2='LEARNER' />
      <Box pt={20}>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 2 }}
          spacing={{ base: 10, sm: 20 }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
          <Box>
            <Box style={{
              background: "rgba(0,0,0,0.3)",
              padding: 20,
              borderRadius: 10,

            }}>
              <Text c={'white'} mb={20} fz={18}>REQUEST</Text>
              <textarea
                ref={ref}
                style={{
                  width: '100%', height: '63vh', borderRadius: 5, backgroundColor: '#12002A', color: '#ffffff', border: 'none', outline: 'none', resize: 'none'
                }}
                value={request}
                placeholder="Input apa yang kamu inginkan........"
                onChange={(val) => setRequest(val.currentTarget.value)}
              />
            </Box>
            <Button mt={20} fullWidth radius={10} onClick={() => {
              onProses({ page: scrollPage })
            }} color="indigo">KIRIM</Button>
          </Box>
          <Box>

            <Box>
              <Box style={{
                background: "rgba(0,0,0,0.3)",
                padding: 20,
                borderRadius: 10,
                height: '20vh'
              }}>
                <Text c={'white'} mb={20} fz={18}>RESPONS</Text>
                {response && (
                  <Text c={'#CE9E23'}>
                    <TextAnimation
                      phrases={[response]}
                      typingSpeed={0}
                      backspaceDelay={0}
                      eraseDelay={0}
                      timeComplete={0}
                      errorProbability={0}
                      eraseOnComplete={false}
                      isSecure={false}
                    />
                  </Text>
                )}
              </Box>
            </Box>
            <Box mt={20}>
              <Box style={{
                background: "rgba(0,0,0,0.3)",
                padding: 20,
                borderRadius: 10,
                height: '60vh'
              }}>
                <Text c={'white'} mb={20} fz={18}>LOG REQUEST</Text>
                {/* <CobaScroll isload={isLoad} datalist={listLogRequest} /> */}
                <ScrollLoaderExternalState url="/api/get-log-request" height='50vh' take={15} data={listScrollData} setData={setListScrollData} page={scrollPage} setPage={setScrollPage}  >
                  {(dataScoll: any) => <ScrollItem dataScroll={dataScoll} page={scrollPage} />}
                </ScrollLoaderExternalState>
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}