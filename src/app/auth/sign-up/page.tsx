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

export default function SingUp() {
  const [userNameError, setUserNameError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [isOpenModalWindow, setIsOpenModalWindow] = useState(false)
  const [email, setEmail] = useState<string>('')

  console.log('RENDER FORM')
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
      baseUrl: window.location.origin + '/auth/sign-up',
    })
      .unwrap()
      .then(() => {
        setEmail(data.email)
        reset()
        setIsOpenModalWindow(true)
      })
      .catch(err => {
        if (err.data.messages[0].field === 'userName') {
          setUserNameError('User with this username is already registered')
        }
        if (err.data.messages[0].field === 'email') {
          setEmailError('User with this email is already registered')
        }
      })
  }

  return (
    <Card className={'mx-auto my-6 flex max-w-[378px] flex-col items-center p-6'}>
      <Typography variant={'h1'} className={'mb-3'}>
        Sign Up
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
            errorText={errors.username?.message || userNameError}
            {...register('username', {
              onChange: () => setUserNameError(null),
            })}
          />
          <Input
            className={'min-h-[84px]'}
            type={'Email'}
            errorText={errors.email?.message || emailError}
            {...register('email', {
              onChange: () => setEmailError(null),
            })}
          />
          <Input
            className={'min-h-[84px]'}
            type={'password'}
            errorText={errors.password?.message}
            {...register('password')}
          />
          <Input
            label={'Password confirmation'}
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
            I agree to the&nbsp;
            <Link href={'/auth/sign-up/terms'}>
              <Typography variant={'small_link'}>Terms of Service</Typography>
            </Link>
            <Typography variant={'small_text'}> and </Typography>
            <Link href={'/auth/sign-up/privacy'}>
              <Typography variant={'small_link'}>Privacy Policy</Typography>
            </Link>
          </Typography>
        </div>
        <Button
          className={'w-full'}
          disabled={!isValid || !isDirty || !!userNameError || !!emailError}
        >
          <Typography variant={'h3'}>Sign Up</Typography>
        </Button>
      </form>
      <Typography variant={'regular_text_16'} className={'mb-1.5'}>
        Do you have an account?
      </Typography>
      <Button className={'w-full text-center'} variant={'text'} asChild>
        <Link href={'/auth/sign-in'}>
          <Typography variant={'h3'}>Sign In</Typography>
        </Link>
      </Button>
      <ModalWindow
        modalTitle={'Email sent'}
        open={isOpenModalWindow}
        onClose={() => setIsOpenModalWindow(false)}
      >
        <div className={'relative mt-7.5 px-6'}>
          <Typography className={'mb-4.5'} variant={'regular_text_16'}>
            We have sent a link to confirm your email to {email}
          </Typography>
          <Button onClick={() => setIsOpenModalWindow(false)} className={'float-right w-24'}>
            OK
          </Button>
        </div>
      </ModalWindow>
    </Card>
  )
}
