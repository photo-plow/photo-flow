import { initI18n, defaultNS, supportedLngs, type Locale } from '@/i18n/config'
import TranslationsProvider from '@/i18n/TranslationsProvier'
import ClientProviders from './ClientProviders'

export async function generateStaticParams() {
  return supportedLngs.map(lng => ({ lng }))
}

type Params = { lng: string }

function isLocale(v: unknown): v is Locale {
  return typeof v === 'string' && (supportedLngs as readonly string[]).includes(v)
}

export default async function LocaleLayout(props: {
  children: React.ReactNode
  params: Params | Promise<Params>
}) {
  const { children } = props
  const { lng } = await props.params

  const locale: Locale = isLocale(lng) ? lng : 'ru'
  const i18n = await initI18n(locale, [defaultNS])

  const resources = {
    [locale]: { [defaultNS]: i18n.getResourceBundle(locale, defaultNS) },
  }

  return (
    <TranslationsProvider locale={locale} resources={resources}>
      <ClientProviders>{children}</ClientProviders>
    </TranslationsProvider>
  )
}
