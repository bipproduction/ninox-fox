"use client"
import { BackgroundImage, Box, Button, Flex, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { LuShieldCheck } from 'react-icons/lu';
import toast from 'react-simple-toasts';
import funLogin from '../fun/login';
import { funSetCookies } from '../fun/set_cookies';
import { useFocusTrap } from '@mantine/hooks';

export default function ViewLogin() {
  const focusTrapRef = useFocusTrap()
  const [isEmail, setEmail] = useState("")
  const [isPassword, setPassword] = useState("")
  const [isLoading, setLoading] = useState(false)


  async function onLogin() {

    if (isEmail == "" || isPassword == "")
      return toast('Please fill in completely', { theme: 'dark' })

    setLoading(true)
    const cek = await funLogin({ email: isEmail, pass: isPassword })
    if (!cek.success) {
      setLoading(false)
      return toast(cek.message, { theme: 'dark' })
    }

    await funSetCookies({ user: cek.id })
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
            ref={focusTrapRef}
          >
            <Box>
              <Text fw={"bold"} fz={30} c={"white"}>EXISTING MEMBER</Text>
              <Text fz={20} c={"white"}>Welcome Back!</Text>
            </Box>
            <Stack pt={25}>
              <TextInput
                label={<Text fz={14} c={"white"}>Email</Text>}
                onChange={(val) => { setEmail(val.target.value) }}
              />
              <PasswordInput
                label={<Text fz={14} c={"white"}>Password</Text>}
                onChange={(val) => { setPassword(val.target.value) }}
              />
              <Group pt={10} justify='space-between'>
                <Group>
                  <LuShieldCheck size={20} color={"white"} />
                  <Text c={"white"}>Secure Access</Text>
                </Group>
                <Text c={"white"}>Secure Access</Text>
              </Group>
              <Button
                mt={10}
                mb={10}
                fullWidth
                loading={isLoading}
                variant="filled" color="#280B4F"
                onClick={() => {
                  onLogin()
                }}
              >
                Login
              </Button>
            </Stack>
          </Box>

        </Flex>

      </BackgroundImage>
    </>
  );
}
