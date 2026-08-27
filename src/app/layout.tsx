import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../../theme';
import "@mantine/dates/styles.css";
import 'react-simple-toasts/dist/theme/dark.css'
import 'react-simple-toasts/dist/theme/light.css';
import { Poppins } from "next/font/google"
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import RegisterSW from './_pwa/register_sw';


export const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  variable: '--poppins-default'
});

export const metadata = {
  title: 'Ninox - Fox',
  description: 'Ninox - Fox',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=yes"
        />
      </head>
      <body style={poppins.style}>
        <MantineProvider theme={theme}><Notifications position='top-right' zIndex={1000} />{children}</MantineProvider>
        <RegisterSW />
      </body>
    </html>
  );
}