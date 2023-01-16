import clsx from 'clsx'
import Link from 'next/link'
import { useThemeContext } from '../context/ThemeContext'
import { ThemeKeys } from '../types'

export default function Index() {
  const { theme, changeTheme } = useThemeContext()
  const isLightTheme = theme === ThemeKeys.LIGHT

  return (
    <>
      <main className={clsx(isLightTheme ? ThemeKeys.LIGHT : ThemeKeys.DARK)}>
        <h1>Theme: {theme}</h1>
        <Link href="/">Go Home</Link>
      </main>
      <div className="button-container">
        <button
          type="button"
          className="change-theme-button"
          onClick={changeTheme}
        >
          Change Theme
        </button>
      </div>
    </>
  )
}
