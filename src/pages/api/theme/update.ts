import type { NextApiRequest, NextApiResponse } from 'next'
import { ThemeKeys } from '../../../types'
import { parseCookie } from '../../../utils/parseCookie'
import setCookie from '../../../utils/setCookie'

export default async function updateSettings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentTheme = parseCookie(req)

  if (!currentTheme) return res.status(404)

  const theme =
    currentTheme === ThemeKeys.LIGHT ? ThemeKeys.DARK : ThemeKeys.LIGHT

  setCookie(res, 'theme', theme)

  return res.status(201).send(theme)
}
