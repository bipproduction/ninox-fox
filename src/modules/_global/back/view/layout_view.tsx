"use client";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { ActionIcon, AppShell, Box, Burger, Group, Indicator, Menu, Modal, NavLink, ScrollArea, Text, UnstyledButton, rem, } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaUserCircle, FaUserTie } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useAtom } from "jotai";
import { isModalLayout } from "../val/isModalLayout";
import _ from "lodash";
import { ModalLogout } from "../..";
import mtqq_client from "../../util/mqtt_client"

/**
 * Fungsi untuk menampilkan template dashsboard admin.
 * @returns component untuk template dashboard
 */

export default function LayoutView({ children, dataMenu, dataUser, pending }: { children: React.ReactNode, dataMenu: any, dataUser: any, pending: any }) {
  const [opened, { toggle }] = useDisclosure();
  const dataSosialEkonomi = [
    {
      "id": 18,
      "keyMenu": "md17",
      "menu": "Ketenagakerjaan - Jaminan Kesehatan",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/jaminan-kesehatan"
    },
    {
      "id": 19,
      "keyMenu": "md18",
      "menu": "Ketenagakerjaan - Jaminan Kecelakaan Kerja",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/jaminan-kecelakaan-kerja"
    },
    {
      "id": 20,
      "keyMenu": "md19",
      "menu": "Ketenagakerjaan - Jaminan Kematian",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/jaminan-kematian"
    },
    {
      "id": 21,
      "keyMenu": "md20",
      "menu": "Ketenagakerjaan - Jaminan Hari Tua",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/jaminan-hari-tua"
    },
    {
      "id": 22,
      "keyMenu": "md21",
      "menu": "Ketenagakerjaan - Jaminan Pensiun",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/jaminan-pensiun"
    },
    {
      "id": 23,
      "keyMenu": "md22",
      "menu": "Ketenagakerjaan - Pengangguran",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/pengangguran"
    },
    {
      "id": 24,
      "keyMenu": "md23",
      "menu": "Transportasi - Permukaan Jalan",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/permukaan-jalan"
    },
    {
      "id": 25,
      "keyMenu": "md24",
      "menu": "Transportasi - Jalan Dilalui Kendaraan",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/jalan-dilalui-kendaraan"
    },
    {
      "id": 26,
      "keyMenu": "md25",
      "menu": "Transportasi - Kecelakaan",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/kecelakaan"
    },
    {
      "id": 27,
      "keyMenu": "md26",
      "menu": "Agama - Rumah Ibadah",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/rumah-ibadah"
    },
    {
      "id": 28,
      "keyMenu": "md27",
      "menu": "Pendidikan - Jarak Fasilitas",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/jarak-fasilitas"
    },
    {
      "id": 29,
      "keyMenu": "md28",
      "menu": "Pendidikan - Jalan Kaki < 4 Jam",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/jalan-kaki-kurang-4-jam"
    },
    {
      "id": 30,
      "keyMenu": "md29",
      "menu": "Pendidikan - Guru Tersertifikasi",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/guru-tersertifikasi"
    },
    {
      "id": 31,
      "keyMenu": "md30",
      "menu": "Pendidikan - Guru Honorer",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/guru-honorer"
    },
    {
      "id": 32,
      "keyMenu": "md31",
      "menu": "Kesehatan - Kelas Ibu Hamil",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/kelas-ibu-hamil"
    },
    {
      "id": 33,
      "keyMenu": "md32",
      "menu": "Kesehatan - Ibu Hamil Dari Keluarga Miskin",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/ibu-hamil-dari-keluarga-miskin"
    },
    {
      "id": 34,
      "keyMenu": "md33",
      "menu": "Kesehatan - Jaminan Untuk BADUTA",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/jaminan-untuk-baduta"
    },
    {
      "id": 35,
      "keyMenu": "md34",
      "menu": "Kesehatan - Pos Pelayanan",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/pos-pelayanan"
    },
    {
      "id": 36,
      "keyMenu": "md35",
      "menu": "Kesehatan - Fasilitas",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/fasilitas"
    },
    {
      "id": 37,
      "keyMenu": "md36",
      "menu": "Kesehatan - Rata Rata Jarak Fasilitas",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/rata-rata-jarak-fasilitas"
    },
    {
      "id": 38,
      "keyMenu": "md37",
      "menu": "Kesehatan - Jumlah Dokter",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/jumlah-dokter"
    },
    {
      "id": 39,
      "keyMenu": "md38",
      "menu": "Keamanan - Perkelahian",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/perkelahian"
    },
    {
      "id": 40,
      "keyMenu": "md39",
      "menu": "Keamanan - Pencurian",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/pencurian"
    },
    {
      "id": 41,
      "keyMenu": "md40",
      "menu": "Keamanan - Pencurian dan Kekerasan",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/pencurian-dan-kekerasan"
    },
    {
      "id": 42,
      "keyMenu": "md41",
      "menu": "Keamanan - Penipuan dan Penggelapan",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/penipuan-dan-penggelapan"
    },
    {
      "id": 43,
      "keyMenu": "md42",
      "menu": "Keamanan - Penganiayaan",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/penganiayaan"
    },
    {
      "id": 44,
      "keyMenu": "md43",
      "menu": "Keamanan - Perkosaan",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/perkosaan"
    },
    {
      "id": 45,
      "keyMenu": "md44",
      "menu": "Keamanan - Narkoba",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/narkoba"
    },
    {
      "id": 46,
      "keyMenu": "md45",
      "menu": "Ekonomi - Jumlah Pasar",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/jumlah-pasar"
    },
    {
      "id": 47,
      "keyMenu": "md46",
      "menu": "Ekonomi - Lembaga Keuangan",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/lembaga-keuangan"
    },
    {
      "id": 48,
      "keyMenu": "md47",
      "menu": "Pertanian - Jenis Prasarana Transportasi",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/jenis-prasarana-transportasi"
    },
    {
      "id": 49,
      "keyMenu": "md48",
      "menu": "Pertanian - Irigasi",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/irigasi"
    },
    {
      "id": 50,
      "keyMenu": "md49",
      "menu": "Kemiskinan - Data Kemiskinan",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/data-kemiskinan"
    },
    {
      "id": 51,
      "keyMenu": "md50",
      "menu": "Kemiskinan - BPJS",
      "owner": "admin",
      "group": "dataSosialEkonomi",
      "link": "/dashboard/se/bpjs"
    }
  ];

  const [qtyPending, setQtyPending] = useState(pending)
  const router = useRouter();
  const pathname = usePathname();
  const [valOpenModal, setOpenModal] = useAtom(isModalLayout)
  const [active, setActive] = useState("");
  useShallowEffect(() => {
    setActive(pathname);
  });

  useEffect(() => {
    mtqq_client.on("connect", () => {
      mtqq_client.subscribe("app_ninox_fox_be")
    })

    mtqq_client.on("message", (topic, message) => {
      const data = JSON.parse(message.toString())
      if (data.statusAdmin == true && data.kategori == '+') {
        setQtyPending(qtyPending + 1)
      } else if (data.statusAdmin == true && data.kategori == '-') {
        setQtyPending(qtyPending - 1)
      }
    })
  }, [qtyPending])

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Box>
                <UnstyledButton
                  onClick={() => router.push("/")}
                  fz={25}
                  fw={700}
                >
                  NINOX
                </UnstyledButton>
              </Box>
            </Group>
            <Box>
              <Menu>
                <Menu.Target>
                  <ActionIcon
                    variant="filled"
                    color="rgba(0, 0, 0, 1)"
                    radius="xl"
                    aria-label="Settings"
                  >
                    <FaUserCircle
                      style={{ width: "70%", height: "70%" }}
                      stroke={"1.5"}
                    />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <FaUserTie style={{ width: rem(14), height: rem(14) }} />
                    }
                  >
                    {(dataUser && dataUser.name) ? dataUser.name : 'unknown user'}
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <RiLogoutCircleRLine
                        style={{ width: rem(14), height: rem(14) }}
                      />
                    }
                    onClick={() => { setOpenModal(true) }}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md" pb={30}>
          <ScrollArea>
            {dataMenu && dataMenu.dataSatu && dataMenu.dataSatu.map((item: any) => {
              return (
                <NavLink
                  key={item.keyMenu}
                  active={item.link === active}
                  fw={item.menu ? "bolder" : "normal"}
                  label={_.upperCase(item.menu)}
                  onClick={() => {
                    router.push(item.link);
                  }}
                  color="#213555"
                  variant="filled"
                />
              );
            })}

            {
              dataMenu && dataMenu.dataRegion && (
                <NavLink
                  label="REGION VALUE EDITOR"
                  childrenOffset={28}
                  fw={"bolder"}
                >
                  {dataMenu && dataMenu.dataRegion && dataMenu.dataRegion.map((item: any) => {
                    return (
                      <NavLink
                        key={item.keyMenu}
                        active={item.link === active}
                        fw={item.menu ? "bolder" : "normal"}
                        label={_.upperCase(item.menu)}
                        onClick={() => {
                          router.push(item.link);
                        }}
                        color="#213555"
                        variant="filled"
                      />
                    );
                  })}
                </NavLink>
              )
            }

            {dataMenu && dataMenu.dataDua && dataMenu.dataDua.map((item: any) => {
              return (
                <NavLink
                  key={item.keyMenu}
                  active={item.link === active}
                  fw={item.menu ? "bolder" : "normal"}
                  label={_.upperCase(item.menu)}
                  onClick={() => {
                    router.push(item.link);
                  }}
                  color="#213555"
                  variant="filled"
                />
              );
            })}

            {dataMenu && dataMenu.dataMLAI && (

              <NavLink
                label={<Group>
                  <Box>ML-AI</Box>
                  {
                    qtyPending > 0 && (
                      <Indicator inline color="red" size={12} position="middle-end" label={qtyPending} />
                    )
                  }

                </Group>
                }
                childrenOffset={28}
                fw={"bolder"}
              >
                {dataMenu && dataMenu.dataMLAI && dataMenu.dataMLAI.map((item: any) => {
                  return (
                    <NavLink
                      key={item.keyMenu}
                      active={item.link === active}
                      fw={item.menu ? "bolder" : "normal"}
                      label={item.menu}
                      onClick={() => {
                        router.push(item.link);
                      }}
                      color="#213555"
                      variant="filled"
                    />
                  );
                })}
              </NavLink>
            )}

            {dataMenu && dataMenu.dataTiga && dataMenu.dataTiga.map((item: any) => {
              return (
                <NavLink
                  key={item.keyMenu}
                  active={item.link === active}
                  fw={item.menu ? "bolder" : "normal"}
                  label={_.upperCase(item.menu)}
                  onClick={() => {
                    router.push(item.link);
                  }}
                  color="#213555"
                  variant="filled"
                />
              );
            })}

            {dataMenu && dataMenu.dataSosialEkonomi && (
              <NavLink
                label="DATA SOSIAL EKONOMI"
                childrenOffset={28}
                fw={"bolder"}
              >
                {dataMenu && dataMenu.dataSosialEkonomi && dataSosialEkonomi.map((item: any) => {
                  return (
                    <NavLink
                      key={item.keyMenu}
                      active={item.link === active}
                      fw={item.menu ? "bolder" : "normal"}
                      label={item.menu}
                      onClick={() => {
                        router.push(item.link);
                      }}
                      color="#213555"
                      variant="filled"
                    />
                  );
                })}
              </NavLink>
            )}
            {
              dataMenu && dataMenu.dataDeveloper && (
                <NavLink
                  label="DEVELOPER"
                  childrenOffset={28}
                  fw={"bolder"}
                >
                  {dataMenu && dataMenu.dataDeveloper && dataMenu.dataDeveloper.map((item: any) => {
                    return (
                      <NavLink
                        key={item.keyMenu}
                        active={item.link === active}
                        fw={item.menu ? "bolder" : "normal"}
                        label={_.upperCase(item.menu)}
                        onClick={() => {
                          router.push(item.link);
                        }}
                        color="#213555"
                        variant="filled"
                      />
                    );
                  })}
                </NavLink>
              )
            }
          </ScrollArea>
        </AppShell.Navbar>
        <AppShell.Main bg={"#EAEAEA"}>
          <Box p={10} pl={20} pr={20}>
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
        <ModalLogout />
      </Modal>
    </>
  );
}
