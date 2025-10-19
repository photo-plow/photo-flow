'use client'

import NextLink, { type LinkProps } from 'next/link'
import { ReactNode } from 'react'
import { useWithLocale } from './useWithLocale'

type Props = LinkProps & { children: ReactNode; className?: string }

export function I18nLink({ href, children, className, ...rest }: Props) {
  const withLocale = useWithLocale()
  const finalHref = typeof href === 'string' ? withLocale(href) : href
  return (
    <NextLink href={finalHref} className={className} {...rest}>
      {children}
    </NextLink>
  )
}
