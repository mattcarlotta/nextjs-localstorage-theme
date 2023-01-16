import { NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import ThemeProvider from '../context/ThemeContext'
import '../styles/globals.css'
import { ThemeKeys } from '../types'
import fetchAPI from '../utils/fetchAPI'

function App({
  Component,
  pageProps,
  theme
}: AppProps & { theme: ThemeKeys | null }) {
  useEffect(() => {
    if (!theme) {
      fetchAPI('/theme/set').catch((err) => console.error(err))
    }
  }, [theme])

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

App.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  const cookie = String(ctx?.req?.headers.cookie)

  const res = await fetchAPI('/theme', {
    method: 'GET',
    headers: {
      Accept: 'text/plain',
      ...(cookie ? { cookie } : {})
    },
    credentials: 'include'
  })

  try {
    const theme = (await res.text()) as ThemeKeys
    return { theme }
  } catch (e) {
    return { theme: null }
  }
}

export default App
