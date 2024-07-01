"use client"
import { useDisclosure, useShallowEffect } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { usePathname, useRouter } from 'next/navigation';
import { ActionIcon, AppShell, AppShellNavbar, AppShellSection, Box, Burger, Center, Collapse, Divider, Drawer, Grid, Group, Indicator, Modal, NavLink, Notification, Skeleton, Stack, Text, Title, Tooltip, Transition, useMantineColorScheme } from '@mantine/core';
import _ from 'lodash';
import { DataNavbarTutup } from '../components/data_navbar_tutup';
import { WARNA } from '../../fun/WARNA';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { DataNavbarBuka } from '../components/data_navbar_buka';
import { useAtom } from 'jotai';
import { isModalLayout } from '../val/isModallayout';
import ModalLogoutUser from '../components/modal_logout_user';
import { IoMdClose, IoMdNotificationsOutline } from 'react-icons/io';
import { isDrawer } from '../val/isDrawer';
import DrawerNotifikasi from '../components/drawer_notifikasi';
import { IoClose } from 'react-icons/io5';
import { funGetAllNotifications, funGetCountNotification } from '../..';
import mtqq_client from "../../util/mqtt_client"
import { funGetUserByCookies } from '@/modules/auth';
import classes from '..//components/hover.module.css'
import { notifications } from '@mantine/notifications';
import { DataMlAi } from '../components/data_ml_ai';
import { DataSosialEkonomi } from '../components/data_sosial_ekonomi';
import { isDetactionNavbar } from '@/modules/regional_insights';


export default function LayoutViewFront({ notif, children }: { notif: number, children: React.ReactNode }) {
  const [valOpenModal, setOpenModal] = useAtom(isModalLayout)
  const [valOpenDrawer, setOpenDrawer] = useAtom(isDrawer)
  const [opened, { toggle }] = useDisclosure();
  const [isOpenNavbar, setOpenNavbar] = useState(true)
  const [isNavOpt, setNavOpt] = useState({ width: 100, breakpoint: 'sm', collapsed: { mobile: isOpenNavbar } })
  const [isListNotif, setListNotif] = useState<any>([])
  const [isNotif, setNotif] = useState(notif)
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const [user, setUser] = useState<any>("")
  const [isDetection, setDetection] = useAtom(isDetactionNavbar)

  useShallowEffect(() => {
    setActive(pathname)
    onFindUser()
  });

  async function OpenModal() {
    const loadNotif = await funGetAllNotifications({ page: 1 })
    setListNotif(loadNotif)
    setOpenDrawer(true)
  }

  function CloseModal() {
    setOpenDrawer(false)
  }



  // eslint-disable-next-line react-hooks/exhaustive-deps
  function notificationData(title: any, message: any) {
    notifications.clean(),
      notifications.show({
        onClickCapture: () => {
          OpenModal()
          notifications.clean()
        },
        title: title,
        message: message,
        classNames: classes,
        color: 'black',
        autoClose: 5000,
        icon: <IoMdNotificationsOutline size={25} onClick={() => {
          OpenModal()
          notifications.clean()
        }} />,
      })
  }


  async function onFindUser() {
    const loadUser = await funGetUserByCookies()
    setUser(loadUser?.id)
  }


  useEffect(() => {
    mtqq_client.on("connect", () => {
      mtqq_client.subscribe("app_ninox_fox")
    })

    mtqq_client.on("message", (topic, message) => {
      const data = JSON.parse(message.toString())
      if (data.user == user) {
        setNotif(isNotif + 1)
        notificationData(data.title, data.description)
      }
    })
  }, [isNotif, user, notificationData])

  async function reloadNotif() {
    const loadN = await funGetCountNotification()
    setNotif(loadN)
  }


  return (
    <>

      <AppShell
        navbar={isNavOpt}
      >
        {isOpenNavbar &&
          (
            <AppShellNavbar pl={23} pt={20} bg={"#000000"} style={{
              border: "none"
            }}>
              <Group>
                <Text fw={"bold"} c={"white"}>NINOX</Text>
                <Burger opened={opened} color="rgba(255, 255, 255, 1)" onClick={toggle} hiddenFrom="sm" size="sm" />
              </Group>
              <Group
                // justify='flex-end' style={{
                //   position: "absolute",
                //   bottom: 130,
                //   // bottom: "50"
                // }}
                pt={30}
              >
                <Stack align="center" p={"xs"}>
                  {DataNavbarTutup.map((v, i) => (
                    <Box key={i}>
                      <Tooltip label={_.upperCase((v.label))} position="right" color={v.link === active ? "#CF080A" : ''}>
                        <ActionIcon
                          c={v.link === active ? "#CF0A0A" : "white"}
                          size={30}
                          variant="subtle"
                          onClick={() => {
                            router.push(v.link);
                          }}
                        >
                          <v.icon size={32} />
                        </ActionIcon>
                      </Tooltip>
                    </Box>
                  ))}
                  {DataMlAi.map((v, i) => (
                    <Box key={i}>
                      <Tooltip label={_.upperCase((v.label))} position="right" color={v.link === active ? "#CF080A" : ''}>
                        <ActionIcon
                          c={v.link === active ? "#CF0A0A" : "white"}
                          size={30}
                          variant="subtle"
                          onClick={() => {
                            router.push(v.link);
                          }}
                        >
                          <v.icon size={32} />
                        </ActionIcon>
                      </Tooltip>
                    </Box>
                  ))}
                  {DataSosialEkonomi.map((v, i) => (
                    <Box key={i}>
                      <Tooltip label={_.upperCase((v.label))} position="right" color={v.link === active ? "#CF080A" : ''}>
                        <ActionIcon
                          c={v.link === active ? "#CF0A0A" : "white"}
                          size={30}
                          variant="subtle"
                          onClick={() => {
                            router.push(v.link);
                          }}
                        >
                          <v.icon size={32} />
                        </ActionIcon>
                      </Tooltip>
                    </Box>
                  ))}
                </Stack>
              </Group>
              <Group
                style={{
                  position: "absolute",
                  bottom: 30,
                }}
                pl={10}
              >
                <Group pb={40}>
                  <ActionIcon onClick={() => {
                    setNavOpt({ width: 250, breakpoint: 'sm', collapsed: { mobile: isOpenNavbar } })
                    setOpenNavbar(false)
                    setDetection(true)
                  }} variant='subtle' c={"white"}>
                    <MdArrowForwardIos size={30} />
                  </ActionIcon>
                </Group>
                <Group justify='center' >
                  <ActionIcon variant='subtle' onClick={() => setOpenModal(true)}>
                    <RiLogoutCircleRLine size={30} color={"white"} />
                  </ActionIcon>
                </Group>
              </Group>
            </AppShellNavbar>
          )
        }
        {!isOpenNavbar &&
          <AppShellNavbar pt={20} bg={"#000000"} style={{
            border: "none"
          }}>
            <Group justify="flex-end" pr={20} pt={30}>
              <ActionIcon onClick={() => {
                setNavOpt({ width: 100, breakpoint: 'sm', collapsed: { mobile: isOpenNavbar } })
                setOpenNavbar(true)
                setDetection(false)
              }} variant='subtle' c={"white"}>
                <AiOutlineClose size={30} />
              </ActionIcon>
            </Group>
            {DataNavbarBuka.map((item) => {
              return (
                <Box key={item.key} m={5} mt={5}>
                  <NavLink
                    active
                    label={active === item.link ? (
                      <Box>
                        <Title order={5} onClick={() => router.push(item.link)}>
                          {item.label}
                        </Title>
                        <Grid pt={5}>
                          <Grid.Col span={3}>
                            <Divider color={"#CF0A0A"} size="lg" />
                          </Grid.Col>
                        </Grid>
                      </Box>
                    ) : (
                      <Box>
                        <Text onClick={() => router.push(item.link)}>
                          {item.label}
                        </Text>

                      </Box>
                    )
                    }
                    onClick={() => {
                      router.push(item.link);
                    }}
                    c={"white"}
                    variant="subtle"
                  />
                </Box>
              )
            })}
            <Box m={5} mt={5}>
              <NavLink
                label="ML-AI"
                childrenOffset={28}
                c={'white'}
                variant='subtle'
                href="#required-for-focus"
                active
              >
                {DataMlAi.map((item) => {
                  return (
                    <Box key={item.key} m={5} mt={5}>
                      <NavLink
                        active
                        label={active === item.link ? (
                          <Box>
                            <Title order={5} onClick={() => router.push(item.link)}>
                              {item.label}
                            </Title>
                            <Grid pt={5}>
                              <Grid.Col span={3}>
                                <Divider color={"#CF0A0A"} size="lg" />
                              </Grid.Col>
                            </Grid>
                          </Box>
                        ) : (
                          <Box>
                            <Text onClick={() => router.push(item.link)}>
                              {item.label}
                            </Text>

                          </Box>
                        )
                        }
                        onClick={() => {
                          router.push(item.link);
                        }}
                        c={"white"}
                        variant="subtle"
                      />
                    </Box>
                  )
                })}
              </NavLink>
            </Box>
            {DataSosialEkonomi.map((item) => {
              return (
                <Box key={item.key} m={5} mt={5}>
                  <NavLink
                    active
                    label={active === item.link ? (
                      <Box>
                        <Title order={5} onClick={() => router.push(item.link)}>
                          {item.label}
                        </Title>
                        <Grid pt={5}>
                          <Grid.Col span={3}>
                            <Divider color={"#CF0A0A"} size="lg" />
                          </Grid.Col>
                        </Grid>
                      </Box>
                    ) : (
                      <Box>
                        <Text onClick={() => router.push(item.link)}>
                          {item.label}
                        </Text>

                      </Box>
                    )
                    }
                    onClick={() => {
                      router.push(item.link);
                    }}
                    c={"white"}
                    variant="subtle"
                  />
                </Box>
              )
            })}
            <Group
              style={{
                position: "absolute",
                bottom: 30,
                cursor: 'pointer',
              }}
            >
              <Group justify='center' pl={20} onClick={() => setOpenModal(true)}>
                <ActionIcon variant='subtle'>
                  <RiLogoutCircleRLine size={30} color={"white"} />
                </ActionIcon>
                <Text c={"white"}>LOGOUT</Text>
              </Group>
            </Group>
          </AppShellNavbar>
        }
        <AppShell.Main bg={WARNA.bgGradasi}>
          <Box pr={10} pt={{ base: 23, xl: 32, lg: 26, sm: 23 }} style={{ zIndex: 400, position: "fixed", right: 20 }}>

            {
              isNotif > 0 ? (
                <Indicator inline processing color="red" size={12} label={isNotif}>
                  <ActionIcon variant="filled" color="#390B7D" p={5} size={35} radius="xl" onClick={OpenModal}>
                    <IoMdNotificationsOutline size={30} />
                  </ActionIcon>
                </Indicator>
              ) : (
                <ActionIcon variant="filled" color="#0E0121" p={5} size={35} radius="xl" onClick={OpenModal}>
                  <IoMdNotificationsOutline size={30} />
                </ActionIcon>
              )
            }
          </Box>
          <Box p={20}>
            {children}
          </Box>
        </AppShell.Main>
      </AppShell>
      <Modal
        opened={valOpenModal}
        onClose={() => setOpenModal(false)}
        centered
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <ModalLogoutUser />
      </Modal>

      <Transition
        mounted={valOpenDrawer}
        transition="slide-left"
        duration={500}
        timingFunction="ease"
      >
        {
          (style) =>
            <Box
              bg={WARNA.ungu}
              p={10}
              top={0}
              right={0}
              h={'100%'}
              w={{ base: '50%', xl: '30%', lg: '35%', md: '40%', sm: '50%' }}
              pos={'fixed'}
              style={{
                ...style,
                zIndex: 700,
              }}
            >
              <Group >
                <ActionIcon variant='subtle' onClick={CloseModal}>
                  <IoClose size={30} color={"white"} />
                </ActionIcon>
                <Text c={"white"}>NOTIFIKASI</Text>
              </Group>
              <DrawerNotifikasi data={isListNotif} onSuccess={() => {
                reloadNotif()
              }} />
            </Box>
          // )
        }
      </Transition>
      <Transition
        mounted={valOpenDrawer}
        transition="fade"
        duration={100}
        timingFunction="ease"
      >
        {
          (style) =>
            <Box
              bg={'#000000'}
              p={10}
              top={0}
              left={0}
              h={'100%'}
              w={'100%'}
              pos={'fixed'}
              style={{
                ...style,
                zIndex: 500,
                opacity: '0.5',
              }}
              onClick={CloseModal}
            >

            </Box>
        }
      </Transition>

    </>
  );
}

