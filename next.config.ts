import type { NextConfig } from 'next'
import { execSync } from 'node:child_process'
import pkg from './package.json'

/** Version stamped on Observatory reports: git short sha, else package version. */
function observatoryVersion(): string {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7)
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return pkg.version
  }
}

/** Absolute site address for og:image and other metadata URLs. */
function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return 'https://govern-the-human.vercel.app'
}

const nextConfig: NextConfig = {
  output: 'export',
  // Emit /observatory/index.html etc., so every page works on any static host
  // without rewrite rules (links become /observatory/).
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_OBSERVATORY_VERSION: observatoryVersion(),
    NEXT_PUBLIC_SITE_URL: siteUrl(),
  },
  images: { unoptimized: true },
  turbopack: {
    root: '.',
  },
}

export default nextConfig
