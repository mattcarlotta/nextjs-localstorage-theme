import { parse } from 'cookie'
import jwt, { JwtPayload } from 'jsonwebtoken'
import type { NextApiRequest } from 'next'
import getJWTSecret from './jwtSecret'

export function parseCookie(req: NextApiRequest): string {
  const { token } = parse(req.headers.cookie || '') || {}
  return token ? (jwt.verify(token, getJWTSecret()) as JwtPayload)?.data : ''
}
