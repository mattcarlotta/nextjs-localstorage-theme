import { parse } from 'cookie'
import jwt, { JwtPayload } from 'jsonwebtoken'
import type { NextApiRequest } from 'next'
import getJWTSecret from './jwtSecret'

function parseToken(token?: string) {
  return token ? (jwt.verify(token, getJWTSecret()) as JwtPayload) : {}
}

export function parseAuthHeader(req: NextApiRequest) {
  const token = (req.headers.authorization || '').replace(/Bearer /g, '')
  return parseToken(token)
}

export function parseCookie(req: NextApiRequest) {
  const cookie = parse(req.headers.cookie || '')
  return parseToken(cookie?.token || '')
}
