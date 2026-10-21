import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { withPayload } from '@payloadcms/next/withPayload'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Media in S3-compatible storage is served from its public address (see docs/cms-deployment.md)
const mediaHost = process.env.S3_PUBLIC_HOST

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
      ...(mediaHost ? [{ protocol: 'https', hostname: mediaHost }] : []),
    ],
  },
  poweredByHeader: false,
  // Next 16 dev writes an AGENTS.md into the repository when it detects a coding agent; this project does not want it
  agentRules: false,
  turbopack: { root: path.resolve(dirname) },

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
      {
        // Editor, preview and admin pages must never be cached by shared caches or indexed
        source: '/(admin|cms)/:path*',
        headers: [
          { key: 'Cache-Control', value: 'private, no-store' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
