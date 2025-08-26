'use client'
import { useState } from 'react'
import { useLogoutMutation } from '@/lib/feature/auth/api/authApi'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/hooks'
import { setIsAuth } from '@/lib/appSlice'
import { AUTH_TOKEN } from '@/constants'

export const useLogout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [logout] = useLogoutMutation()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(setIsAuth({ isAuth: false }))
      localStorage.removeItem(AUTH_TOKEN)
      router.push('/auth/sign-in')
    } catch (error) {
      console.error('logout error', error)
    } finally {
      setIsModalOpen(false)
    }
  }

  return {
    isModalOpen,
    setIsModalOpen,
    logoutHandler: handleLogout,
  }
}
