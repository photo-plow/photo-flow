'use client'

import { Card } from 'photo-flow-ui-kit'
import { Typography } from 'photo-flow-ui-kit'
import { Input } from 'photo-flow-ui-kit'
import { Checkbox } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import Link from 'next/link'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegistrationFields, signUpSchema } from '@/lib/feature/auth/schemas/signUpSchema'
import { useRegistrationMutation } from '@/lib/feature/auth/api/authApi'
import { useState } from 'react'
import { ModalWindow } from 'photo-flow-ui-kit'
import { GitHubLoginButton, GoogleLoginButton } from '@/lib/feature/auth/ui'
import { handleError } from '@/common/utils/handleError'
import { setAppError } from '@/lib/appSlice'
import { useAppDispatch } from '@/lib/hooks'
import { useWithLocale } from '@/i18n/hooks/useWithLocale'
import { useTranslation } from 'react-i18next'

export default function SingUp() {
  const [userNameError, setUserNameError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [isOpenModalWindow, setIsOpenModalWindow] = useState(false)
  const [email, setEmail] = useState<string>('')
  const dispatch = useAppDispatch()
  const withLocale = useWithLocale()
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm<RegistrationFields>({
    mode: 'onTouched',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      agreement: false,
    },
  })

  const [registration] = useRegistrationMutation()

  const onSubmit: SubmitHandler<RegistrationFields> = async data => {
    console.log(data)

    await registration({
      userName: data.username,
      email: data.email,
      password: data.password,
      baseUrl: window.location.origin + withLocale('/auth/sign-up'),
    })
      .unwrap()
      .then(() => {
        setEmail(data.email)
        reset()
        setIsOpenModalWindow(true)
      })
      .catch(err => {
        const errorText = handleError(String(err!.statusCode))
        dispatch(setAppError({ error: errorText }))
        if (err.data.messages[0].field === 'userName') {
          setUserNameError(t('auth_error_usernameExists'))
        }
        if (err.data.messages[0].field === 'email') {
          setEmailError(t('auth_error_emailExists'))
        }
      })
  }

  return (
    <Card className={'mx-auto my-6 flex max-w-[378px] flex-col items-center p-6'}>
      <Typography variant={'h1'} className={'mb-3'}>
        {t('auth_signUp_title')}
      </Typography>
      <div className={'mb-6 flex gap-15'}>
        <GitHubLoginButton />
        <GoogleLoginButton />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'mb-[18px] flex w-full flex-col items-center'}
      >
        <div className={'mb-3 flex w-full flex-col'}>
          <Input
            className={'min-h-[84px]'}
            type={'username'}
            placeholder={t('auth_signUp_usernamePlaceholder')}
            errorText={errors.username?.message || userNameError}
            {...register('username', {
              onChange: () => setUserNameError(null),
            })}
          />
          <Input
            className={'min-h-[84px]'}
            type={'email'}
            placeholder={t('common_emailPlaceholder')}
            errorText={errors.email?.message || emailError}
            {...register('email', {
              onChange: () => setEmailError(null),
            })}
          />
          <Input
            className={'min-h-[84px]'}
            type={'password'}
            placeholder={t('common_passwordPlaceholder')}
            errorText={errors.password?.message}
            {...register('password')}
          />
          <Input
            label={t('auth_signUp_passwordConfirmationLabel')}
            type={'password'}
            errorText={errors.passwordConfirmation?.message}
            {...register('passwordConfirmation')}
          />
        </div>
        <div className={'mb-3 flex w-full items-center'}>
          <Controller
            name='agreement'
            control={control}
            render={({ field }) => (
              <Checkbox
                id={'agreement'}
                checked={field.value}
                onCheckedChange={field.onChange}
                ref={field.ref}
              />
            )}
          />
          <Typography variant={'small_text'}>
            {t('auth_agree_prefix')}&nbsp;
            <Link href={withLocale('/auth/sign-up/terms')}>
              <Typography variant={'small_link'}>{t('auth_terms_label')}</Typography>
            </Link>
            <Typography variant={'small_text'}> {t('common_and')} </Typography>
            <Link href={withLocale('/auth/sign-up/privacy')}>
              <Typography variant={'small_link'}>{t('auth_privacy_label')}</Typography>
            </Link>
          </Typography>
        </div>
        <Button
          className={'w-full'}
          disabled={!isValid || !isDirty || !!userNameError || !!emailError}
        >
          <Typography variant={'h3'}>{t('auth_label_signUp')}</Typography>
        </Button>
      </form>
      <Typography variant={'regular_text_16'} className={'mb-1.5'}>
        {t('auth_signUp_haveAccount')}
      </Typography>
      <Button className={'w-full text-center'} variant={'text'} asChild>
        <Link href={withLocale('/auth/sign-in')}>
          <Typography variant={'h3'}>{t('auth_label_signIn')}</Typography>
        </Link>
      </Button>
      <ModalWindow
        modalTitle={t('auth_modal_emailSent_title')}
        open={isOpenModalWindow}
        onClose={() => setIsOpenModalWindow(false)}
      >
        <div className={'relative mt-7.5 px-6'}>
          <Typography className={'mb-4.5'} variant={'regular_text_16'}>
            {t('auth_modal_emailSent_text', { email })}
          </Typography>
          <Button onClick={() => setIsOpenModalWindow(false)} className={'float-right w-24'}>
            {t('common_ok')}
          </Button>
        </div>
      </ModalWindow>
    </Card>
  )
}
