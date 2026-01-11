/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/how-we-work',
        destination: '/how-i-work',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
