import { useThemeContext } from '../context/ThemeContext'

export default function ChangeThemeButton() {
  const { changeTheme } = useThemeContext()

  return (
    <div className="button-container">
      <button
        type="button"
        className="change-theme-button"
        onClick={changeTheme}
      >
        Change Theme
      </button>
    </div>
  )
}
