/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    jwtSecretKey: process.env.JWT_SECRET_KEY
  }
}

module.exports = nextConfig
