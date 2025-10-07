'use client'
import Link from 'next/link'
import { Input } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import { LoginFields, signInSchema } from '@/lib/feature/auth/schemas/signInSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/lib/feature/auth/api/authApi'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLazyGetProfileQuery } from '@/lib/feature/profile/api/profileApi'
import { Card } from 'photo-flow-ui-kit'
import { Typography } from 'photo-flow-ui-kit'
import { GitHubLoginButton, GoogleLoginButton } from '@/lib/feature/auth/ui'
import { AUTH_TOKEN } from '@/constants'
import { setAppError, setIsAuth } from '@/lib/appSlice'
import { useAppDispatch } from '@/lib/hooks'
import { handleError } from '@/common/utils/handleError'
import { useTranslation } from 'react-i18next'
import { useWithLocale } from '@/i18n/hooks/useWithLocale'

type ApiError = {
  status: number
  data: {
    error: string
    messages: string
    statusCode: number
  }
}

export default function SignIn() {
  const [loginError, setLoginError] = useState('')
  const [login] = useLoginMutation()
  const [profile] = useLazyGetProfileQuery()
  const { t } = useTranslation()
  const router = useRouter()
  const withLocale = useWithLocale()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginFields>({
    mode: 'onTouched',
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFields) => {
    try {
      const loginResponse = await login(data).unwrap()
      dispatch(setIsAuth({ isAuth: true }))
      localStorage.setItem(AUTH_TOKEN, loginResponse.accessToken)
      reset()
      // FIX: Срабатываем еще один me запрос при запросе профиля
      const profileResponse = await profile().unwrap()

      if (
        profileResponse.firstName &&
        profileResponse.lastName &&
        profileResponse.userName &&
        profileResponse.dateOfBirth
      ) {
        router.push(withLocale('/'))
      } else {
        router.push(withLocale(`/profile/${profileResponse.id}/ProfileSettings`))
      }
    } catch (err: unknown) {
      const apiError = err as ApiError
      const errorText = handleError(String(apiError.status))
      dispatch(setAppError({ error: errorText }))
      if (apiError) {
        setLoginError(t('auth_error_badCredentials'))
      }
    }
  }

  const resetInputError = () => {
    if (loginError) {
      setLoginError('')
    }
  }

  return (
    <Card className={`mx-auto w-[380px] p-6`}>
      <Typography variant={'h1'} className={'mb-[14px] text-center'}>
        {t('auth_signIn_title')}
      </Typography>
      <div className={'mb-6 flex justify-center gap-15'}>
        <GitHubLoginButton />
        <GoogleLoginButton />
      </div>
      {loginError && (
        <Typography variant={'h3'} className={'text-danger-500 text-center'}>
          {loginError}
        </Typography>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col`}>
        <div className='mb-9 flex flex-col gap-6'>
          <Input
            placeholder={t('common_emailPlaceholder')}
            type='email'
            className={`w-full`}
            errorText={errors.email?.message}
            {...register('email', {
              onChange: resetInputError,
            })}
          />
          <Input
            placeholder={t('common_passwordPlaceholder')}
            type='password'
            className={`w-full`}
            errorText={errors.password?.message}
            {...register('password', {
              onChange: resetInputError,
            })}
          />
        </div>

        <Button
          asChild
          variant='text'
          className='text-light-900 mb-6 ml-auto w-[112px] border-0 p-0'
        >
          <Link href={withLocale('/auth/forgot-password')}>
            <Typography variant={'regular_text_14'}>{t('auth_signIn_forgot')}</Typography>
          </Link>
        </Button>
        <div className='flex flex-col items-center'>
          <Button
            variant='primary'
            className='mb-[18px] flex w-full justify-center font-semibold'
            type='submit'
            disabled={!isValid || !!loginError}
          >
            {t('auth_label_signIn')}
          </Button>
          <p className='mb-[6px] leading-[1.5]'> {t('auth_signIn_noAccount')}</p>
          <Button asChild variant='text' className='leading-[1.5] font-semibold'>
            <Link href={withLocale('/auth/sign-up')}>{t('auth_label_signUp')}</Link>
          </Button>
        </div>
      </form>
    </Card>
  )
}
