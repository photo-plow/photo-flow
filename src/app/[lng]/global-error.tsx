'use client'

import { Button, Header, Typography } from 'photo-flow-ui-kit'
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter } from 'next/navigation'
import { Locale } from './Content'

export default function GlobalError() {
  const { t } = useTranslation()

  const pathname = usePathname() || '/'
  const segs = pathname.split('/')
  const currentLocale: Locale = segs[1] === 'en' ? 'en' : 'ru'
  const router = useRouter()

  const onLanguageChange = (lng: Locale) => {
    document.cookie = `lng=${lng};path=/;max-age=31536000`
    const parts = pathname.split('/')
    if (parts[1] === 'ru' || parts[1] === 'en') parts.splice(1, 1)
    const base = parts.join('/') || '/'
    router.push(`/${lng}${base === '/' ? '' : base}`)
  }

  return (
    <html>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header isAuth={true} language={currentLocale} onLanguageChange={onLanguageChange} />

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 16,
            padding: 24,
          }}
        >
          <Typography variant='h2'>{t('error_generic_oops')}</Typography>

          <Button onClick={() => window.location.replace('/')}>{t('common_goHome')}</Button>
        </div>
      </body>
    </html>
  )
}
