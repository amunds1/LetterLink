const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Default: true - must be false due drag and drop
  swcMinify: true,
}

module.exports = withPWA(nextConfig)
