'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NotFound() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const lang = pathname.split('/')[1]
    if (lang === 'ru' || lang === 'en') {
      router.push(`/${lang}`)
    } else {
      router.push('/en')
    }
  }, [router])

  return <></>
}
