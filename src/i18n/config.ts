import { createInstance, type Resource } from 'i18next'

import ruCommon from '@/locales/ru/common.json'
import enCommon from '@/locales/en/common.json'

export const supportedLngs = ['ru', 'en'] as const
export type Locale = (typeof supportedLngs)[number]
export const defaultNS = 'common' as const
export const namespaces = [defaultNS] as const

const resources = {
  ru: { common: ruCommon },
  en: { common: enCommon },
} satisfies Resource

export async function initI18n(lng: Locale, ns: string[] = [defaultNS], res?: Resource) {
  const i18n = createInstance()
  await i18n.init({
    lng,
    fallbackLng: 'ru',
    supportedLngs: [...supportedLngs],
    ns,
    defaultNS,
    resources: res ?? resources,
    interpolation: { escapeValue: false },
  })
  return i18n
}
