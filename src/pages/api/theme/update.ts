import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../../lib/redis'
import { ThemeKeys } from '../../../types'
import { parseCookie } from '../../../utils/parseRequest'

export default async function updateSettings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = parseCookie(req)
  const currentTheme = await redis.get(userId)

  if (!currentTheme) return res.status(404)

  const theme =
    currentTheme === ThemeKeys.LIGHT ? ThemeKeys.DARK : ThemeKeys.LIGHT

  await redis.set(userId, theme)

  return res.status(201).json({ theme })
}
