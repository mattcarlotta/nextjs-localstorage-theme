import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import redis from '../../../../lib/redis'
import { ThemeKeys } from '../../../types'
import getJWTSecret from '../../../utils/jwtSecret'

const expiration = 2592000

export const cookieOptions = {
  httpOnly: true,
  maxAge: expiration,
  path: '/',
  secure: process.env.NODE_ENV === 'production'
}

export default async function saveSettings(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const defaultValue = ThemeKeys.LIGHT
  const userId = uuidv4()

  const signedToken = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + expiration,
      data: userId
    },
    getJWTSecret()
  )

  await redis.set(userId, defaultValue, 'ex', expiration)

  res.setHeader('Set-Cookie', serialize('token', signedToken, cookieOptions))

  return res.status(201).json({ theme: defaultValue })
}
