'use client'

import { useGetMeQuery } from '@/lib/feature/auth/api/authApi'
import { Button } from 'photo-flow-ui-kit'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useWithLocale } from '@/i18n/hooks'

type Props = {
  id: string
}

export const ProfileControls = ({ id }: Props) => {
  const { data, isLoading, isFetching, error } = useGetMeQuery()
  const { t } = useTranslation()
  const withLocale = useWithLocale()

  if (error || isLoading || isFetching) return <></>

  if (data && data.userId !== Number(id)) {
    return (
      <div className='text-regular-16 flex gap-[12px]'>
        <Button variant='primary'>{t('profile_follow')}</Button>
        <Button variant='secondary'>{t('profile_sendMessage')}</Button>
      </div>
    )
  }
  return (
    <Button asChild className='w-[167px h-[36px]' variant='secondary'>
      <Link href={withLocale(`/profile/${data?.userId}/ProfileSettings`)}>
        {t('profile_settings')}
      </Link>
    </Button>
  )
}
