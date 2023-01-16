import { parse } from 'cookie'
import type { NextApiRequest } from 'next'

export function parseCookie(req: NextApiRequest) {
  const cookie = parse(req.headers.cookie || '')

  return cookie?.theme || null
}
