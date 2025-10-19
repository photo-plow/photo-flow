export const SUPPORTED_LOCALES = ['ru', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export function isLocale(v: unknown): v is Locale {
  return typeof v === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(v)
}

export function currentLocaleFromPath(pathname: string, fallback: Locale = 'ru'): Locale {
  const seg = (pathname || '').split('/')[1]
  return isLocale(seg) ? seg : fallback
}

export function withLocale(
  href: string,
  opts?: { lng?: string; fromPath?: string; fallback?: Locale }
): string {
  const fallback: Locale = isLocale(opts?.fallback) ? opts!.fallback! : 'ru'

  if (/^(https?:)?\/\//i.test(href) || /^[a-zA-Z]+:/.test(href)) return href

  const target: Locale =
    (opts?.lng && isLocale(opts.lng) && opts.lng) ||
    (opts?.fromPath ? currentLocaleFromPath(opts.fromPath, fallback) : fallback)

  const firstSeg = href.split('/')[1] ?? ''
  if (isLocale(firstSeg)) return href

  const normalized = href.startsWith('/') ? href : `/${href}`
  return `/${target}${normalized}`
}

export function replaceLocale(pathname: string, nextLng: string, fallback: Locale = 'ru'): string {
  const lng: Locale = isLocale(nextLng) ? nextLng : fallback
  const segs = (pathname || '/').split('/')

  if (isLocale(segs[1])) {
    segs[1] = lng
    const out = segs.join('/') || '/'
    return out.startsWith('/') ? out : `/${out}`
  }

  const base = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `/${lng}${base === '/' ? '' : base}`
}
