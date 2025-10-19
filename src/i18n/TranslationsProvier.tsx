'use client'

import { useRef } from 'react'
import i18next, { type Resource, type i18n } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { defaultNS } from './config'

type Props = {
  locale: 'ru' | 'en'
  resources: Resource
  children: React.ReactNode
}

export default function TranslationsProvider({ locale, resources, children }: Props) {
  const i18nRef = useRef<i18n | null>(null)

  if (!i18nRef.current) {
    const instance = i18next.createInstance()
    instance.use(initReactI18next).init({
      lng: locale,
      resources,
      fallbackLng: 'ru',
      ns: [defaultNS],
      defaultNS,
      interpolation: { escapeValue: false },
      initImmediate: false,
    })
    i18nRef.current = instance
  }

  return <I18nextProvider i18n={i18nRef.current!}>{children}</I18nextProvider>
}
