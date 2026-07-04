import fs from 'node:fs'
import path from 'node:path'
import type { PortfolioProject, ProjectPreviews } from '../data/projects'

const DEVICE_KEYS = ['desktop', 'tablet', 'mobile'] as const

function publicFileExists(relativePath: string): boolean {
  // ponytail: no real filesystem in the Cloudflare Workers runtime — public/
  // assets are deployed as static files 1:1 with the repo, so the existence
  // check only needs to run where fs actually works (Node: dev + prerender).
  if (typeof navigator !== 'undefined' && navigator.userAgent === 'Cloudflare-Workers') {
    return true
  }
  const filePath = path.join(process.cwd(), 'public', relativePath.replace(/^\//, ''))
  return fs.existsSync(filePath)
}

export function resolveProjectPreviews(project: PortfolioProject): ProjectPreviews | undefined {
  const fallback = project.images?.[0]
  const resolved: ProjectPreviews = {}

  for (const key of DEVICE_KEYS) {
    const src = project.previews?.[key]
    if (src && publicFileExists(src)) {
      resolved[key] = src
    }
  }

  const mobileOnly = project.category === 'mobile'
    && Boolean(resolved.mobile)
    && !project.previews?.desktop
    && !project.previews?.tablet

  if (mobileOnly) {
    return { mobile: resolved.mobile }
  }

  if (!resolved.desktop && fallback) {
    resolved.desktop = fallback
  }

  if (!resolved.tablet && resolved.desktop) {
    resolved.tablet = resolved.desktop
  }

  if (!resolved.mobile) {
    resolved.mobile = project.previews?.mobile && publicFileExists(project.previews.mobile)
      ? project.previews.mobile
      : fallback
  }

  return Object.values(resolved).some(Boolean) ? resolved : undefined
}

export function withResolvedPreviews(project: PortfolioProject): PortfolioProject {
  return {
    ...project,
    previews: resolveProjectPreviews(project),
  }
}
