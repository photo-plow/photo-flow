'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AUTH_TOKEN } from '@/constants'
import { setIsAuth } from '@/lib/appSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import { useWithLocale } from '@/i18n/hooks'

export default function GitHubCallback() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const withLocale = useWithLocale()

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const token = searchParams.get('accessToken')

    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
      dispatch(setIsAuth({ isAuth: true }))
      router.replace(withLocale('/'))
    } else {
      console.warn('❌ Нет accessToken в URL')
    }
  }, [searchParams, router, dispatch])

  return null
}
