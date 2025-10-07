import { initI18n } from '@/i18n/config'
import type { Locale } from '@/i18n/config'

export async function getServerTranslate(lng: Locale, ns?: string) {
  if (ns) {
    const i18n = await initI18n(lng, [ns])
    return i18n.getFixedT(lng, ns)
  } else {
    const i18n = await initI18n(lng)
    return i18n.getFixedT(lng, ns)
  }
}
