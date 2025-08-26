'use client'
import React from 'react'
import { useAppSelector } from '@/lib/hooks'
import { selectIsAuth } from '@/lib/appSlice'
import { useGetMeQuery } from '@/lib/feature/auth/api/authApi'
import { AlertProvider } from 'photo-flow-ui-kit'
import { Header } from 'photo-flow-ui-kit'
import { Sidebar } from 'photo-flow-ui-kit'
import { useLogout } from '@/utils/useLogout/useLogout'

export function Content({ children }: { children: React.ReactNode }) {
  const isAuth = useAppSelector(selectIsAuth)
  const { logoutHandler, setIsModalOpen, isModalOpen } = useLogout()
  const { data } = useGetMeQuery()

  return (
    <AlertProvider>
      <Header isAuth={isAuth} />
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
