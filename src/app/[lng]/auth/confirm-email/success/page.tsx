'use client'
import { Typography } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import Link from 'next/link'
import Image from 'next/image'
import { useWithLocale } from '@/i18n/hooks'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const withLocale = useWithLocale()
  const { t } = useTranslation()

  return (
    <div className={'flex h-full w-full flex-col items-center'}>
      <Typography className={'mb-5'} variant={'h1'}>
        {t('auth_emailConfirmed_title')}
      </Typography>
      <Typography className={'mb-[54px]'} variant={'regular_text_16'}>
        {t('auth_emailConfirmed_desc')}
      </Typography>
      <Button className={'mb-18 w-[182px] text-center'} asChild>
        <Link href={withLocale('/auth/sign-in')}>
          <Typography variant={'h3'}>{t('auth_label_signIn')}</Typography>
        </Link>
      </Button>
      <Image
        width={432}
        height={300}
        src={'/success-email.webp'}
        alt={t('auth_emailConfirmed_imgAlt')}
      />
    </div>
  )
}
