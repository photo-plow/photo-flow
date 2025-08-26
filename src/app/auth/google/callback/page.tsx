'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppDispatch } from '@/lib/store'
import { useDispatch } from 'react-redux'
import { useGoogleLoginMutation } from '@/lib/feature/auth/api/authApi'
import { AUTH_TOKEN } from '@/constants'
import { Loader } from 'photo-flow-ui-kit'
import { setIsAuth } from '@/lib/appSlice'

export default function GoogleCallback() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [googleLogin] = useGoogleLoginMutation()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (!code) return

    const doLogin = async () => {
      try {
        const res = await googleLogin({
          code,
          redirectUrl: `${window.location.origin}/auth/google/callback`,
        }).unwrap()
        localStorage.setItem(AUTH_TOKEN, res.accessToken)
        dispatch(setIsAuth({ isAuth: true }))
        router.replace('/')
      } catch (err) {
        console.error('❌ Ошибка авторизации через Google', err)
      }
    }
    void doLogin()
  }, [googleLogin, router, dispatch])

  return <Loader />
}
