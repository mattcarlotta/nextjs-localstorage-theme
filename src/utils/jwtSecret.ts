import getConfig from 'next/config'

export default function getJWTSecret() {
  const { serverRuntimeConfig } = getConfig()
  const JWT_SECRET_KEY = serverRuntimeConfig.jwtSecretKey
  if (!JWT_SECRET_KEY) {
    throw Error('JWT_SECRET_KEY is missing')
  }
  return JWT_SECRET_KEY
}
