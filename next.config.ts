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

const nextConfig: NextConfig = {
  output: 'export',
  env: {
    NEXT_PUBLIC_OBSERVATORY_VERSION: observatoryVersion(),
  },
  images: { unoptimized: true },
  turbopack: {
    root: '.',
  },
}

export default nextConfig
