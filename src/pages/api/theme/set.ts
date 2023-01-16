import type { NextApiRequest, NextApiResponse } from 'next'
import { ThemeKeys } from '../../../types'
import setCookie from '../../../utils/setCookie'

export default async function saveSettings(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const theme = ThemeKeys.LIGHT
  setCookie(res, 'theme', theme)
  return res.status(201).send(theme)
}
