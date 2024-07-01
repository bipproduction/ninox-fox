"use client"
import { Anchor, BackgroundImage, Box, Button, Flex, Grid, Group, PasswordInput, PinInput, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-simple-toasts';
import { funSetCookies } from '../fun/set_cookies';

export default function ViewVerification({ phone, otp, user }: { phone: any, otp: any, user: any }) {
  const router = useRouter()
  const [isOTP, setOTP] = useState(otp)
  const [inputOTP, setInputOTP] = useState<any>()
  const [isLoading, setLoading] = useState(false)

  async function onResend() {
    // proses pengambilan nomer 4 digit random untuk code verfication
    const code = Math.floor(Math.random() * 1000) + 1000

    // proses pengiriman code verification melalui wa
    const res = await fetch(`https://wa.wibudev.com/code?nom=${phone}&text=${code}`)
      .then(
        async (res) => {
          if (res.status == 200) {
            toast('Verification code has been sent', { theme: 'dark' })
            setOTP(code)
          } else {
            toast('Error', { theme: 'dark' })
          }
        }
      );
  }

  // fungsi untuk mengecek code verification yang telah diinputkan
  async function getVerification() {
    setLoading(true)
    if (isOTP == inputOTP) {
      // jika kode benar
      const setC = await funSetCookies({ user: user })
      // await funLogUser({ act: 'LOGIN', desc: `User login` })
      router.push('/summary')
      toast("Verification code is correct", { theme: "dark" })
      setLoading(false)
    } else {
      // jika salah
      toast("Incorrect verification code", { theme: "dark" })
      setLoading(false)
    }
  }

  return (
    <>
      <BackgroundImage src='/bgfull.png' h={"100vh"} pos={"fixed"}>
        <Flex justify={"center"} align={"center"} style={{
          height: "100vh"
        }} >
          <Box
            style={{
              backgroundColor: "#000000",
              border: `2px solid ${"#280B4F"}`,
              padding: 30,
              borderRadius: 10,
            }}
            w={{ base: 300, sm: 400 }}
          >
            <Grid grow>
              <Grid.Col>
                <Text fw={"bold"} fz={25} c={"white"} ta={"center"}>ENTER VERIFICATION CODE</Text>
              </Grid.Col>
            </Grid>
            <Stack pt={20}>
              <Group justify="center" mt={30}>
                <PinInput type={"number"} size='md'
                  onChange={(val) => {
                    setInputOTP(val)
                  }} />
              </Group>
              <Button
                mt={30}
                fullWidth
                variant="filled" color="#280B4F"
                loading={isLoading}
                onClick={() => { getVerification() }}
              >
                Submit
              </Button>
              <Group justify="center" >
                <Text fz={12} c="white">
                  Didnt receive a code ? {""}
                  <Anchor c="white"
                    fz={12}
                    onClick={() => { onResend() }}
                  >
                    Resend
                  </Anchor>
                </Text>
              </Group>
            </Stack>

          </Box>
        </Flex>

      </BackgroundImage>
    </>
  );
}
