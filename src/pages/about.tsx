import Link from 'next/link'
import ChangeThemeButton from '../components/ChangeThemeButton'
import Main from '../components/Main'

export default function Index() {
  return (
    <>
      <Main>
        <h1>About</h1>
        <Link href="/">Go Home</Link>
      </Main>
      <ChangeThemeButton />
    </>
  )
}
