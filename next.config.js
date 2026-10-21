/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  poweredByHeader: false,

  // Documents the old WordPress site published, now hosted here (old page URLs are handled in src/proxy.ts)
  async redirects() {
    return [
      { source: '/wp-content/uploads/2025/05/CISE-DOC.pdf', destination: '/documents/cisce-rules-for-documents.pdf', permanent: true },
      { source: '/wp-content/uploads/2025/08/INTODUCING-ACTIVE-CISCE.pdf', destination: '/documents/introducing-active-cisce.pdf', permanent: true },
    ]
  },

  // Basic hardening headers on every response
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
