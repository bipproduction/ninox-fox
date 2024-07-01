'use client'
import { Anchor, Box, Divider, Flex, Group, Text } from '@mantine/core';
import React, { useState } from 'react';
import { IoNotificationsOffOutline } from 'react-icons/io5';
import { isDrawer } from '../val/isDrawer';
import { useAtom } from 'jotai';
import { MdBrowserUpdated } from 'react-icons/md';
import classes from './hover.module.css'
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { funGetAllNotifications, funUpdReadNotifications } from '../..';
import { ScrollLoaderExternalState } from 'next-scroll-loader'
import _ from "lodash"


export default function DrawerNotifikasi({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
  const [valOpenDrawer, setOpenDrawer] = useAtom(isDrawer)
  const router = useRouter()
  const [isJumlah, setJumlah] = useState(data.length)

  // const [isData, setData] = useState(data.falseRead)
  // const [isDataRead, setDataRead] = useState(data.trueRead)

  async function StartModal(id: any, kategori: any) {
    const upd = await funUpdReadNotifications({ id: id })

    let link = 'summary'
    setOpenDrawer(false)
    onSuccess(true)
    await new Promise((r) =>
      setTimeout(r, 500)
    )

    if (kategori == 'emotion') {
      link = '/summary'
    } else if (kategori == 'step') {
      link = '/step'
    } else if (kategori == 'swot') {
      link = '/swot'
    } else if (kategori == 'mlai') {
      link = '/ml-ai'
    } else if (kategori == 'mlai-request') {
      link = '/data-learner'
    } else if (kategori == 'pairing') {
      link = '/pairing'
    } else if (kategori == 'pct') {
      link = '/insights'
    } else if (kategori == 'lta') {
      link = '/insights'
    } else if (kategori == 'rhi') {
      link = '/insights'
    } else {
      if (kategori == 'ketenagakerjaan') {
        link = '/data-sosial-ekonomi/' + kategori
      } else if (kategori == 'infrastruktur-transportasi') {
        link = '/data-sosial-ekonomi/' + kategori
      } else if (kategori == 'keagamaan') {
        link = '/data-sosial-ekonomi/' + kategori
      } else if (kategori == 'pendidikan') {
        link = '/data-sosial-ekonomi/' + kategori
      } else if (kategori == 'kesehatan') {
        link = '/data-sosial-ekonomi/' + kategori
      } else if (kategori == 'ekonomi') {
        link = '/data-sosial-ekonomi/' + kategori
      } else if (kategori == 'pertanian') {
        link = '/data-sosial-ekonomi/' + kategori
      } else if (kategori == 'kemiskinan-ketimpangan') {
        link = '/data-sosial-ekonomi/' + kategori
      }
    }

    router.push(link)
  }

  const [listScrollData, setListScrollData] = useState<any[]>([])
  const [scrollPage, setScrollPage] = useState(1)


  const ScrollItem = ({ dataScroll, page }: { dataScroll: any, page:any }) => {
    const [dataScr, setDataScr] = useState<{ [key: string]: any }>(dataScroll)

    async function onReadNotif(value: any) {
      const upd = await funUpdReadNotifications({ id: value })


      const loadData = await funGetAllNotifications({ page: page })
      setListScrollData(loadData)
      // setListScrollData(loadData.trueRead)
      // setData(upd)
      // setData(loadData.falseRead)
      // setDataRead(loadData.trueRead)

      onSuccess(true)
    }

    return <Box>
      {!dataScr.isRead && (
        <Box>
          <Box key={dataScr.id} mb={10} m={10}>
            <Box
              style={{
                border: "1px solid white",
                padding: 20,
                borderRadius: 10,
              }}
              className={classes.box}
            >
              <Box
                onClick={() => StartModal(dataScr.id, dataScr.category)}
                style={{ cursor: "pointer" }}
              >
                <Group>
                  <MdBrowserUpdated size={25} color={'white'} />
                  <Text fw={'bold'} c={'white'}>{dataScr.title}</Text>
                </Group>

                <Box pt={5}>
                  <Text c={'white'}>{dataScr.description}</Text>
                </Box>
              </Box>
              <Divider my={5} color='white' />
              <Group justify="space-between">
                <Text size="sm" c={'#828282'} ta={'right'}>
                  {moment(dataScr.createdAt).format('LLL')}
                </Text>
                <Anchor size={'sm'} onClick={() => { onReadNotif(dataScr.id) }}>
                  tandai telah dibaca
                </Anchor>
              </Group>
            </Box>
          </Box>
        </Box>
      )}
      {dataScr.isRead && (
        // render something else when isRead is true
        <Box key={dataScr.id} mb={10} m={10}>
          <Box
            style={{
              border: "1px solid gray",
              padding: 20,
              borderRadius: 10,
            }}
            className={classes.box}
          >
            <Box
              onClick={() => StartModal(dataScr.id, dataScr.category)}
              style={{ cursor: "pointer" }}
            >
              <Group>
                <MdBrowserUpdated size={25} color={'#828282'} />
                <Text fw={'bold'} c={'#828282'}>{dataScr.title}</Text>
              </Group>

              <Box pt={5}>
                <Text c={'#828282'}>{dataScr.description}</Text>
              </Box>
            </Box>
            <Divider my={5} color='#828282' />
            <Group justify="space-between">
              <Text size="sm" c={'#828282'} ta={'right'}>
                {moment(dataScr.createdAt).format('LLL')}
              </Text>
              <Anchor size={'sm'} c={'#828282'}>
                telah dibaca
              </Anchor>
            </Group>
          </Box>
        </Box>
      )}
    </Box>
  }



  return (

    <Box pt={10}>
      {
        isJumlah == 0 || _.isNaN(isJumlah) ? (
          <Flex justify={'center'} align={'center'} mih={'80vh'} direction={'column'} >
            <Box mb={10}>
              <IoNotificationsOffOutline size={50} color="#696969" />
            </Box>
            <Text c={'#696969'} fw={'bold'}>TIDAK ADA NOTIFIKASI</Text>
          </Flex>
        ) :
          <ScrollLoaderExternalState url="/api/scroll-loader" height='95vh' take={15} data={listScrollData} setData={setListScrollData} page={scrollPage} setPage={setScrollPage}  >
            {(dataScoll: any) => <ScrollItem dataScroll={dataScoll} page={scrollPage}/>}
          </ScrollLoaderExternalState>
      }

    </Box>

  );
}

