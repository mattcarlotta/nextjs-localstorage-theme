import clsx from 'clsx'
import { ReactNode } from 'react'
import { useThemeContext } from '../context/ThemeContext'
import { ThemeKeys } from '../types'

export default function Main({ children }: { children: ReactNode }) {
  const { theme } = useThemeContext()

  return (
    <main
      className={clsx(
        'space-y-2',
        theme === ThemeKeys.LIGHT ? ThemeKeys.LIGHT : ThemeKeys.DARK
      )}
    >
      {children}
    </main>
  )
}
