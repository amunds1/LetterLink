import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { PageHeader } from '../components/PageHeader'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  const [opened, setOpened] = useState(false)

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: colorScheme,
          }}
        >
          <AppShell
            padding="md"
            header={
              <PageHeader
                links={[
                  { link: '/games', label: 'Games' },
                  { link: '/profile', label: 'Profile' },
                  { link: '/signin', label: 'Sign in' },
                  { link: '/signout', label: 'Sign out' },
                ]}
              />
            }
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}
