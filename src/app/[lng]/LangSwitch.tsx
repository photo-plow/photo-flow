'use client'
// --------------------------------------------------DELETE AFTER TESTS
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter } from 'next/navigation'

export default function LangSwitch() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const changeTo = i18n.language === 'ru' ? 'en' : 'ru'

  const switchLang = () => {
    const parts = pathname.split('/')
    parts[1] = changeTo
    document.cookie = `lng=${changeTo};path=/;max-age=31536000`
    router.push(parts.join('/'))
  }

  return <button onClick={switchLang}>{t('switch')}</button>
}
