import { parse } from 'cookie'
import { NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import fetchAPI from 'src/utils/fetchAPI'
import ThemeProvider from '../context/ThemeContext'
import '../styles/globals.css'
import { ThemeKeys } from '../types'

function App({
  Component,
  theme,
  pageProps
}: AppProps & { theme: ThemeKeys | null }) {
  useEffect(() => {
    if (!theme) {
      fetchAPI('/api/set-settings').catch((err) => console.error(err))
    }
  }, [theme])

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

App.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  const cookie = ctx?.req
    ? String(ctx.req.headers.cookie)
    : typeof document !== 'undefined'
    ? document.cookie
    : ''

  const { token } = parse(cookie)

  const res = await fetchAPI('/api/settings', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    credentials: 'include'
  })

  if (!res.ok) {
    return { theme: null }
  }

  const data = await res.json()
  const theme: ThemeKeys | null = data?.theme || null

  return { theme }
}

export default App
