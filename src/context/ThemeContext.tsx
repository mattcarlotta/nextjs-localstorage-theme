import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'
import { ThemeKeys } from '../types'
import fetchAPI from '../utils/fetchAPI'

export const ThemeContext = createContext({
  theme: ThemeKeys.LIGHT,
  changeTheme: () => {}
})

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error(
      'This component cannot be rendered outside the ThemeContext component'
    )
  }
  return context
}

export default function ThemeProvider({
  children,
  theme
}: {
  children: ReactNode
  theme: ThemeKeys | null
}) {
  const [themeValue, setTheme] = useState(theme || ThemeKeys.LIGHT)

  const changeTheme = useCallback(async () => {
    const res = await fetchAPI('/theme/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        theme: themeValue === ThemeKeys.LIGHT ? ThemeKeys.DARK : ThemeKeys.LIGHT
      }),
      credentials: 'include'
    })

    if (!res.ok) {
      console.error('Unable to save and update theme')
      return
    }

    const data = await res.json()

    setTheme(data.theme)
  }, [themeValue])

  return (
    <ThemeContext.Provider value={{ theme: themeValue, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
