import clsx from 'clsx'
import useLocalStorage from '../hooks/useLocalStorage'

enum ThemeKeys {
  DARK = 'dark',
  LIGHT = 'light'
}

export default function Index() {
  const [theme, changeTheme] = useLocalStorage<ThemeKeys>(
    'theme',
    ThemeKeys.LIGHT
  )
  const isLightTheme = theme === ThemeKeys.LIGHT

  return (
    <>
      <main className={clsx(isLightTheme ? ThemeKeys.LIGHT : ThemeKeys.DARK)}>
        <h1>Theme: {theme}</h1>
      </main>
      <div className="button-container">
        <button
          type="button"
          className="change-theme-button"
          onClick={() =>
            changeTheme(isLightTheme ? ThemeKeys.DARK : ThemeKeys.LIGHT)
          }
        >
          Change Theme
        </button>
      </div>
    </>
  )
}
