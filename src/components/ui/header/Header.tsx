'use client'

import { memo } from 'react'
import { Select } from '@/components/ui/Select/Select'
import { Button } from '@/components/ui/button/Button'
import Inctagram from '@/assets/icons/Inctagram.svg'
import InctagramForSuperAdmin from '@/assets/icons/InctagramForSuperAdmin.svg'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { NotificationsDropdown } from '@/components/ui/header/notificationsDropdown/NotificationsDropdown'
import { Notification } from '@/lib/feature/notifications/api/notificationsApi.types'

type Props = {
  isSuperAdminPanel?: boolean
  notifications: Notification[]
  fetchNotifications: () => Promise<void>
  marlAllRead: () => void
  unreadCount: number
  className?: string
  isAuth: boolean
}

const langVariant = [
  {
    title: 'Russian',
    path: '/Flag-Russia.svg',
  },
  {
    title: 'English',
    path: '/Flag-United-Kingdom.svg',
  },
]

export const Header = memo(
  ({
    isSuperAdminPanel = false,
    className,
    isAuth,
    notifications,
    unreadCount,
    marlAllRead,
    fetchNotifications,
  }: Props) => {
    const lang = 'English' // язык только eng

    const changeLangHandler = () => {
      // (country: string)
      // логика смены языка. внедряется/не внедряется уточнить.
    }

    return (
      <header
        className={twMerge(
          'bg-dark-700 border-dark-300 fixed z-[100] flex h-[60px] w-full items-center justify-between border-b py-[12px]',
          isAuth ? 'pr-[64px] pl-[60px]' : 'px-[60px]',
          className
        )}
      >
        {isSuperAdminPanel ? (
          <Link href='/'>
            <InctagramForSuperAdmin className={'h-[36px] w-[198px] fill-white'} />
          </Link>
        ) : (
          <Link href='/'>
            <Inctagram className={'h-[36px] w-[128px] fill-white'} />
          </Link>
        )}

        <div className={twMerge('flex items-center', isAuth ? 'gap-[45px]' : 'gap-[36px]')}>
          {isAuth && !isSuperAdminPanel && (
            <NotificationsDropdown
              notifications={notifications}
              unreadCount={unreadCount}
              marlAllRead={marlAllRead}
              fetchNotifications={fetchNotifications}
            />
          )}
          <Select
            items={langVariant}
            className={'h-[36px] w-[163px]'}
            placeholder={'tut'}
            onValueChange={changeLangHandler}
            value={lang}
          />
          {!isAuth && (
            <div className={'flex gap-[24px]'}>
              <Button variant={'outline'} asChild>
                <Link href={'/auth/sign-in'}>Log in</Link>
              </Button>
              <Button asChild>
                <Link href={'/auth/sign-up'}>Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </header>
    )
  }
)

Header.displayName = 'Header'
