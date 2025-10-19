import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const supported = ['ru', 'en']
const PUBLIC_FILE = /\.(.*)$/

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (PUBLIC_FILE.test(pathname) || pathname.startsWith('/api')) return

  const hasLocale = supported.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return

  const cookieLng = req.cookies.get('lng')?.value ?? ''
  const accept = req.headers.get('accept-language') ?? ''
  const headerLng = accept.split(',')[0]?.split('-')[0] ?? ''

  const detected = supported.includes(cookieLng) ? cookieLng : headerLng
  const locale = supported.includes(detected) ? detected : 'ru'

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url))
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|assets).*)'],
}
