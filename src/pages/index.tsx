import Link from 'next/link'
import ChangeThemeButton from '../components/ChangeThemeButton'
import Main from '../components/Main'

export default function Index() {
  return (
    <>
      <Main>
        <h1>Home</h1>
        <Link href="/about">Go To About</Link>
      </Main>
      <ChangeThemeButton />
    </>
  )
}
