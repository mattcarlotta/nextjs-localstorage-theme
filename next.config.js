/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  serverRuntimeConfig: {
    jwtSecretKey: process.env.JWT_SECRET_KEY
  }
}

module.exports = nextConfig
