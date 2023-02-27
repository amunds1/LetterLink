import {
  AppShell,
  Center,
  ColorScheme,
  ColorSchemeProvider,
  LoadingOverlay,
  MantineProvider,
} from '@mantine/core'
import { getAnalytics, setUserId } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { PageNavBar } from '../components/PageNavBar'
import { AuthProvider } from '../firebase/AuthProvider'
import { usePageLoading } from '../hooks/usePageLoading'
import * as gtag from '../lib/gtag'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  // At refresh - get the saved color scheme value
  useEffect(() => {
    const savedColorScheme = JSON.parse(
      localStorage.getItem('colorScheme') || ''
    )
    if (savedColorScheme) {
      toggleColorScheme(savedColorScheme)
    }
  }, [])

  const [opened, setOpened] = useState(false)

  const router = useRouter()

  const { isPageLoading } = usePageLoading()

  /* 
    Manually set Google Analytics user ID
    https://firebase.google.com/docs/analytics/userid

    From the docs:

      After setting a user ID, all future events will be automatically tagged with this value, 
      and you can access it by querying for the user_id value in BigQuery. 
      Adding a user ID will not affect any events previously recorded by Google Analytics.
  */
  const auth = getAuth()
  const user = auth.currentUser

  useEffect(() => {
    if (user) {
      setUserId(getAnalytics(), user.uid)
    }
  }, [user])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url, user?.uid)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events, user])

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

      {/* Set 'user_id' in gtag config */}
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
              header={<PageNavBar />}
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
