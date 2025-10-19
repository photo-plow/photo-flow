'use client'

import React, { useEffect } from 'react'
import { useAppSelector } from '@/lib/hooks'
import { selectIsAuth } from '@/lib/appSlice'
import { useGetMeQuery } from '@/lib/feature/auth/api/authApi'
import { AlertProvider, Sidebar } from 'photo-flow-ui-kit'
import { Header } from 'photo-flow-ui-kit'
import HomeIcon from '@/assets/icons/home.svg'
import CreateIcon from '@/assets/icons/create.svg'
import AccountIcon from '@/assets/icons/account.svg'
import MessageIcon from '@/assets/icons/message.svg'
import SearchIcon from '@/assets/icons/search.svg'
import StatisticsIcon from '@/assets/icons/statistics.svg'
import FavoriteIcon from '@/assets/icons/bookmark-outline.svg'
import { useLogout } from '@/utils/useLogout/useLogout'
import { useTranslation } from 'react-i18next'
import { useWithLocale } from '@/i18n/hooks'
import { usePathname, useRouter } from 'next/navigation'

export type Locale = 'ru' | 'en'

export function Content({ children }: { children: React.ReactNode }) {
  const isAuth = useAppSelector(selectIsAuth)
  const { logoutHandler, setIsModalOpen, isModalOpen } = useLogout()
  const { data } = useGetMeQuery()
  const withLocale = useWithLocale()
  const { t } = useTranslation()
  const pathname = usePathname() || '/'
  const segs = pathname.split('/')

  const currentLocale: Locale = segs[1] === 'en' ? 'en' : 'ru'

  const router = useRouter()

  useEffect(() => {
    if (pathname.split('/').length !== 2) return
    const lang = pathname.split('/')[1]
    if (lang === 'ru' || lang === 'en') {
      router.push(`/${lang}`)
    } else {
      router.push('/en')
    }
  }, [router])

  const onLanguageChange = (lng: Locale) => {
    document.cookie = `lng=${lng};path=/;max-age=31536000`
    const parts = pathname.split('/')
    if (parts[1] === 'ru' || parts[1] === 'en') parts.splice(1, 1)
    const base = parts.join('/') || '/'
    router.push(`/${lng}${base === '/' ? '' : base}`)
  }

  const mainMenuItems = [
    {
      title: t('nav_feed'),
      url: withLocale('/'),
      icon: HomeIcon,
    },
    {
      title: t('nav_create'),
      url: withLocale('#'), // todo
      icon: CreateIcon,
    },
    {
      title: t('nav_myProfile'),
      url: withLocale(`/profile/${data?.userId}`),
      icon: AccountIcon,
    },
    {
      title: t('nav_messenger'),
      url: withLocale('#'), // todo
      icon: MessageIcon,
    },
    {
      title: t('nav_search'),
      url: withLocale('#'), //todo
      icon: SearchIcon,
    },
  ]
  const secondaryMenuItems = [
    {
      title: t('nav_statistics'),
      url: withLocale('#'), // todo
      icon: StatisticsIcon,
    },
    {
      title: t('nav_favorites'),
      url: withLocale('#'), // todo
      icon: FavoriteIcon,
    },
  ]

  return (
    <AlertProvider>
      <Header
        isAuth={isAuth}
        language={currentLocale}
        onLanguageChange={onLanguageChange}
        key={currentLocale}
      />

      <div className='max-w-[1920px]'>
        <div className='flex'>
          {isAuth && data && (
            <Sidebar
              menuItems={mainMenuItems}
              secondaryMenuItems={secondaryMenuItems}
              isAuth={isAuth}
              email={data!.email}
              logoutHandlerAction={logoutHandler}
              isModalOpen={isModalOpen}
              setIsModalOpenAction={setIsModalOpen}
              texts={{
                logout: t('nav_logout'),
                modalTitle: t('logout_title'),
                modalIntro: t('logout_question_intro'),
                yes: t('common_yes'),
                no: t('common_no'),
              }}
            />
          )}
          <main className={`${isAuth ? 'ml-[220px]' : ''} w-full px-6 pt-[96px]`}>{children}</main>
        </div>
      </div>
    </AlertProvider>
  )
}
