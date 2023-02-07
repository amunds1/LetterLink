import {
  AppShell,
  Center,
  ColorScheme,
  ColorSchemeProvider,
  LoadingOverlay,
  MantineProvider,
} from '@mantine/core'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { AuthProvider } from '../firebase/AuthProvider'
import { usePageLoading } from '../hooks/usePageLoading'
import * as gtag from '../lib/gtag'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  const [opened, setOpened] = useState(false)

  const router = useRouter()

  const { isPageLoading } = usePageLoading()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>LetterLink</title>
        <meta
          name="viewport"
          content="maximum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

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
          <AuthProvider>
            <AppShell
              padding="md"
              header={<PageHeader />}
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
                },
              })}
            >
              {isPageLoading ? (
                <Center>
                  <LoadingOverlay visible={true} overlayBlur={2} />
                </Center>
              ) : (
                <Component {...pageProps} />
              )}
            </AppShell>
          </AuthProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}
