'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import {
  useCheckRecoveryCodeMutation,
  useResendPasswordEmailMutation,
} from '@/lib/feature/auth/api/authApi'
import { ResponseError } from '@/lib/feature/auth/api/authApi.types'
import { useAppDispatch } from '@/lib/hooks'
import { handleError } from '@/common/utils/handleError'
import { setAppError } from '@/lib/appSlice'

export default function CheckCodePassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const email = searchParams.get('email')
  const [resendEmail] = useResendPasswordEmailMutation()
  const [checkCode] = useCheckRecoveryCodeMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!code) return

    const checkCodeValidity = async () => {
      try {
        await checkCode({ recoveryCode: code }).unwrap()
        router.push(`/auth/create-new-password?code=${code}`)
      } catch (e) {
        const err = e as ResponseError

        const errorText = handleError(String(err.status))
        dispatch(setAppError({ error: errorText }))
        router.push(`/auth/forgot-password/expired?email=${email}`)
        console.log('Confirmation error: ', err.data.messages[0].message)
      }
    }
    checkCodeValidity()
  }, [code, router, resendEmail, checkCode, email])
  return <></>
}
