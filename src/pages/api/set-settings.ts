import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import redis from '../../../lib/redis'
import { ThemeKeys } from '../../types'
import getJWTSecret from '../../utils/jwtSecret'

export const cookieOptions = {
  httpOnly: false,
  maxAge: 2592000,
  path: '/',
  secure: process.env.NODE_ENV === 'production'
}

export default async function saveSettings(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const defaultValue = ThemeKeys.LIGHT
  const id = uuidv4()
  const JWT_SECRET_KEY = getJWTSecret()

  const signedToken = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 2592000,
      data: id
    },
    JWT_SECRET_KEY
  )

  await redis.set(id, defaultValue, 'ex', 2592000)

  res.setHeader('Set-Cookie', serialize('token', signedToken, cookieOptions))

  return res.status(201).json({ theme: defaultValue })
}
