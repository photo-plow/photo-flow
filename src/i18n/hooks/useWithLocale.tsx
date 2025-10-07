'use client'

import { usePathname } from 'next/navigation'
import { withLocale } from '../utils/withLocale'

export function useWithLocale() {
  const pathname = usePathname() || '/'
  return (href: string) => withLocale(href, { fromPath: pathname })
}
