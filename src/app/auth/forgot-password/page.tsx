'use client'

import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Recaptcha } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import { Typography } from 'photo-flow-ui-kit'
import { Input } from 'photo-flow-ui-kit'
import { Card } from 'photo-flow-ui-kit'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useForgotPasswordMutation } from '@/lib/feature/auth/api/authApi'
import { ModalWindow } from 'photo-flow-ui-kit'
import { ResponseError } from '@/lib/feature/auth/api/authApi.types'

type FormData = {
  email: string
}

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
  })

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const [showCaptcha, setShowCaptcha] = useState(true)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isCaptchaError, setIsCaptchaError] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentEmail, setCurrentEmail] = useState('')

  const captchaRef = useRef<ReCAPTCHA>(null)

  const onSubmit = async (data: FormData) => {
    if (!captchaToken && !isEmailSent) {
      setIsCaptchaError(true)
      return
    }
    try {
      await forgotPassword({
        email: data.email,
        recaptcha: captchaToken,
        baseUrl: window.location.origin + '/auth/forgot-password',
      }).unwrap()
      reset()
      setError(null)
      setCaptchaToken(null)
      setCurrentEmail(data.email)
      setIsEmailSent(true)
      setShowCaptcha(false)
      setIsModalOpened(true)
    } catch (error: unknown) {
      if (error !== null && typeof error === 'object' && 'status' in error && 'data' in error) {
        const apiError = error as ResponseError
        if (apiError.status === 400) {
          setError(apiError.data.messages[0].message)
          setCaptchaToken(null)
          captchaRef.current?.reset()
        } else if (apiError.status === 500) {
          setError('SERVER ERROR')
        } else {
          setError('Some error')
        }
      } else {
        setError('Watch console')
        console.log(error)
      }
    }
  }

  function handleCaptchaChange(token: string | null) {
    setIsCaptchaError(false)
    if (token) setCaptchaToken(token)
  }

  return (
    <div className={'mt-9 flex items-center justify-center'}>
      <Card className='bg-dark-500 m-auto flex w-[378px] flex-col items-center px-[24px] pt-[24px] pb-[16px]'>
        <Typography variant='h1' className='mb-[37px]'>
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={'mb-[24px]'} noValidate>
          <Input
            type={'email'}
            placeholder={'Epam@epam.com'}
            className='mb-[7px] w-full'
            errorText={errors.email?.message || error}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'The email must match the format example@example.com',
              },
            })}
            onChange={() => setError(null)}
          />
          <Typography variant='regular_text_14' className='text-light-900 mb-[17px]'>
            Enter your email address and we will send you further instructions
          </Typography>
          {isEmailSent && (
            <Typography variant='regular_text_14' className='text-light-100 mb-[23px]'>
              The link has been sent by email.
              <br />
              If you don’t receive an email send link again
            </Typography>
          )}
          <Button
            type={'submit'}
            className='h-[36px] w-full text-[16px] font-semibold'
            disabled={isLoading}
          >
            Send Link {isEmailSent ? 'Again' : ''}
          </Button>
        </form>
        <Button
          asChild
          className='mb-[16px] h-[36px] w-full text-[16px] font-semibold'
          variant='text'
          disabled={isLoading}
        >
          <Link href='/auth/sign-in'>Back to Sign In</Link>
        </Button>

        {showCaptcha && (
          <Recaptcha
            error={isCaptchaError}
            recaptchaRef={captchaRef}
            handleCaptchaAction={handleCaptchaChange}
          />
        )}
      </Card>
      <ModalWindow
        modalTitle='Email sent'
        open={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      >
        <div className='h-full w-full px-[24px] pt-[30px] pb-[36px]'>
          <Typography variant='regular_text_16'>
            We have sent a link to confirm your email to {currentEmail}
          </Typography>
          <Button
            onClick={() => setIsModalOpened(false)}
            className='absolute right-[24px] bottom-[36px]'
          >
            OK
          </Button>
        </div>
      </ModalWindow>
    </div>
  )
}
