'use client'

import React from 'react'
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

export function Content({ children }: { children: React.ReactNode }) {
  const isAuth = useAppSelector(selectIsAuth)
  const { logoutHandler, setIsModalOpen, isModalOpen } = useLogout()
  const { data } = useGetMeQuery()

  const mainMenuItems = [
    {
      title: 'Feed',
      url: '/',
      icon: HomeIcon,
    },
    {
      title: 'Create',
      url: '#',
      icon: CreateIcon,
    },
    {
      title: 'My Profile',
      url: `/profile/${data?.userId}`,
      icon: AccountIcon,
    },
    {
      title: 'Messenger',
      url: '#',
      icon: MessageIcon,
    },
    {
      title: 'Search',
      url: '#',
      icon: SearchIcon,
    },
  ]
  const secondaryMenuItems = [
    {
      title: 'Statistics',
      url: '#',
      icon: StatisticsIcon,
    },
    {
      title: 'Favorites',
      url: '#',
      icon: FavoriteIcon,
    },
  ]

  return (
    <AlertProvider>
      <Header isAuth={isAuth} />
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
            />
          )}
          <main className={`${isAuth ? 'ml-[220px]' : ''} w-full px-6 pt-[96px]`}>{children}</main>
        </div>
      </div>
    </AlertProvider>
  )
}
