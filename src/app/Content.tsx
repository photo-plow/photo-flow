'use client'
import React from 'react'
import { useAppSelector } from '@/lib/hooks'
import { selectIsAuth } from '@/lib/appSlice'
import { useGetMeQuery } from '@/lib/feature/auth/api/authApi'
import { AlertProvider } from '@/components/ui/Alert/AlertProvider'
import { Header } from '@/components/ui/header/Header'
import { Sidebar } from '@/components/ui/sidebar/Sidebar'
import { useLogout } from '@/hooks/useLogout'
import { useNotifications } from '@/hooks/useNotifications'

export function Content({ children }: { children: React.ReactNode }) {
  const isAuth = useAppSelector(selectIsAuth)
  const { logoutHandler, setIsModalOpen, isModalOpen } = useLogout()
  const { data } = useGetMeQuery()

  const { unreadCount, notifications, marlAllRead, fetchNotifications } = useNotifications()

  return (
    <AlertProvider>
      <Header
        isAuth={isAuth}
        notifications={notifications}
        unreadCount={unreadCount}
        marlAllRead={marlAllRead}
        fetchNotifications={fetchNotifications}
      />
      <div className='max-w-[1920px]'>
        <div className='flex'>
          {isAuth && (
            <Sidebar
              logoutHandler={logoutHandler}
              userId={data?.userId}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
          <main className={`${isAuth ? 'ml-[220px]' : ''} w-full px-6 pt-[96px]`}>{children}</main>
        </div>
      </div>
    </AlertProvider>
  )
}
