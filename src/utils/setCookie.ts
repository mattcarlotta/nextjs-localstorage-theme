import { serialize } from 'cookie'
import type { NextApiResponse } from 'next'

const expiration = 2592000

export const cookieOptions = {
  httpOnly: true,
  maxAge: expiration,
  path: '/',
  secure: process.env.NODE_ENV === 'production'
}

export default function setCookie(
  res: NextApiResponse,
  name: string,
  value: string
) {
  res.setHeader('Set-Cookie', serialize(name, value, cookieOptions))
}
