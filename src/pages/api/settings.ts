import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../lib/redis'
import { parseAuthHeader } from '../../utils/parseRequest'

export default async function getSettings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data: userKey } = parseAuthHeader(req)
  const theme = await redis.get(userKey)
  return res.status(200).json({ theme: theme || null })
}
