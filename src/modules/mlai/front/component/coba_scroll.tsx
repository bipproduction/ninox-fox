'use client'
import { Box, Divider, Group, Spoiler, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import moment from 'moment';
import { ScrollLoaderExternalState } from 'next-scroll-loader';
// import { ScrollLoader } from 'next-scroll-loader';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GiBackwardTime } from 'react-icons/gi';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

export default function CobaScroll({ isload, datalist }: { isload: any, datalist: any }) {
  const router = useRouter()
  const [link, setLink] = useState("/api/get-log-request")
  const [cekLoad, setLoad] = useState(false)
  const [listScrollData, setListScrollData] = useState(datalist)
  const [scrollPage, setScrollPage] = useState(1)

  async function load1() {
    setLink("")
    await new Promise((r) =>
      setTimeout(r, 500)
    )
    setLink("/api/get-log-request")
    setLoad(isload)
  }

  useShallowEffect(() => {
    if (cekLoad != isload) {
      load1()
    }

  }, [cekLoad, isload])

  return (
    <>
      <ScrollLoaderExternalState url={link} height='50vh' take={15} data={listScrollData} setData={setListScrollData} page={scrollPage} setPage={setScrollPage}  >
        {(data: any) =>
          <Box>
            <Box style={{
              cursor: "pointer"
            }} key={data.id}
              onClick={() => {
                if (data.status == 1) {
                  router.push('/ml-ai')
                }
              }
              }
            >
              <Spoiler maxHeight={30} showLabel="Show more" hideLabel="Hide">
                <Text c={data.status == 0 ? '#CE9E23' : '#2CCC1E'}>{data.request} </Text>
              </Spoiler>
              <Group justify='space-between' style={{
                alignItems: "center",
                alignContent: "center"
              }}>
                <Text c={'#D0CFCF'} fz={13}>{moment(data.createdAt).format('LLL')}</Text>
                <Group gap={5} mt={10} style={{
                  alignItems: "center",
                  alignContent: "center"
                }}>
                  {
                    data.status == 0
                      ? <GiBackwardTime size={25} color={'#CE9E23'} />
                      : <IoIosCheckmarkCircleOutline size={25} color={'#2CCC1E'} />
                  }
                  <Text c={data.status == 0 ? '#CE9E23' : '#2CCC1E'} fz={13}>{data.status == 0 ? 'Pending' : 'Terjawab'}</Text>
                </Group>
              </Group>
              <Divider my="md" color={'#6E6C68'} />
            </Box>
          </Box>
        }
      </ScrollLoaderExternalState>
    </>
  );
}

