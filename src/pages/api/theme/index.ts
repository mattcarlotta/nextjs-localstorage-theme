import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../../lib/redis'
import { parseCookie } from '../../../utils/parseRequest'

export default async function getSettings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = parseCookie(req)
  const theme = await redis.get(userId)
  return res.status(200).json({ theme })
}
