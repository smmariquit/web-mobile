export type PreviewDevice = 'desktop' | 'tablet' | 'mobile'

export interface PreviewSources {
  desktop?: string
  tablet?: string
  mobile?: string
}

/** Container width below which we prefer the phone screenshot. */
export const PREVIEW_MOBILE_MAX = 420

/** Container width below which we prefer tablet over desktop. */
export const PREVIEW_TABLET_MAX = 680

export function pickPreviewDevice(
  width: number,
  options?: { mobileFirst?: boolean },
): PreviewDevice {
  if (options?.mobileFirst) return 'mobile'
  if (width < PREVIEW_MOBILE_MAX) return 'mobile'
  if (width < PREVIEW_TABLET_MAX) return 'tablet'
  return 'desktop'
}

const FALLBACK_ORDER: Record<PreviewDevice, PreviewDevice[]> = {
  mobile: ['mobile', 'tablet', 'desktop'],
  tablet: ['tablet', 'mobile', 'desktop'],
  desktop: ['desktop', 'tablet', 'mobile'],
}

export function pickPreviewSrc(
  width: number,
  previews?: PreviewSources | null,
  fallback?: string,
  options?: { mobileFirst?: boolean; preferDesktop?: boolean },
): string | undefined {
  if (options?.preferDesktop) {
    const sources = previews ?? {}
    return sources.desktop ?? sources.tablet ?? sources.mobile ?? fallback
  }

  const device = pickPreviewDevice(width, options)
  const sources = previews ?? {}

  for (const key of FALLBACK_ORDER[device]) {
    if (sources[key]) return sources[key]
  }

  return fallback
}

/** Closest device that actually has an asset. */
export function resolvePreviewDevice(
  preferred: PreviewDevice,
  previews?: PreviewSources | null,
): PreviewDevice {
  for (const key of FALLBACK_ORDER[preferred]) {
    if (previews?.[key]) return key
  }
  return preferred
}
