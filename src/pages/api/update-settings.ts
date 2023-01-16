import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../lib/redis'
import { ThemeKeys } from '../../types'
import { parseCookie } from '../../utils/parseRequest'

export default async function saveSettings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: userKey } = parseCookie(req)

  if (!userKey) return res.status(404)

  const currentTheme = await redis.get(userKey)
  const theme =
    currentTheme === ThemeKeys.LIGHT ? ThemeKeys.DARK : ThemeKeys.LIGHT

  await redis.set(userKey, theme)

  return res.status(201).json({ theme })
}
