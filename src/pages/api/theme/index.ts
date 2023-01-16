import type { NextApiRequest, NextApiResponse } from 'next'
import { parseCookie } from '../../../utils/parseCookie'

export default async function getSettings(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const theme = parseCookie(req)
  return res.status(200).send(theme)
}
