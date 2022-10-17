import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

import theme from '@/styles/theme'
import createEmotionCache from '@/utils/createEmotionCache'

import type { EmotionCache } from '@emotion/react'
import type { AppProps } from 'next/app'
import type { FC } from 'react'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
  pageProps: any
}

const MyApp: FC<MyAppProps> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width, minimum-scale=1"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  </SessionProvider>
)

export default MyApp
