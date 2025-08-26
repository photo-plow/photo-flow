'use client'
import { Typography } from 'photo-flow-ui-kit'
import Image from 'next/image'
import { Input } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import { useResendEmailMutation } from '@/lib/feature/auth/api/authApi'
import React, { useState } from 'react'
import { ResponseError } from '@/lib/feature/auth/api/authApi.types'
import { ModalWindow } from 'photo-flow-ui-kit'

export default function Page() {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [isOpenModalWindow, setIsOpenModalWindow] = useState(false)

  const [resendEmail] = useResendEmailMutation()

  const sendVerificationLink = async () => {
    try {
      await resendEmail({
        email,
        baseUrl: window.location.origin + '/auth/sign-up',
      }).unwrap()
      setIsOpenModalWindow(true)
    } catch (err) {
      const incorrectInput = err as ResponseError
      setError(incorrectInput.data.messages[0].message)
    }
  }

  const validateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!re.test(e.target.value)) {
      setError('email must be ex@ex.com')
    } else {
      setError(null)
    }
  }
  const onCloseModal = () => {
    setEmail('')
    setIsOpenModalWindow(false)
  }

  return (
    <div className={'mt-9 flex h-full w-full flex-col items-center'}>
      <Typography className={'mb-5'} variant={'h1'}>
        Email verification link expired
      </Typography>
      <Typography className={'mb-[30px] max-w-[294px] text-center'} variant={'regular_text_16'}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Input
        placeholder={'example@example.com'}
        onBlur={validateEmail}
        errorText={error}
        type={'email'}
        className={'mb-1 min-h-[84px] w-[230px]'}
        value={email}
        onChange={e => {
          setError(null)
          setEmail(e.target.value)
        }}
      />
      <Button onClick={sendVerificationLink} className={'mb-9'} disabled={!email}>
        Resend verification link
      </Button>
      <Image width={474} height={352} src={'/expired-email.webp'} alt={'expired email link'} />
      <ModalWindow modalTitle={'Email sent'} open={isOpenModalWindow} onClose={onCloseModal}>
        <div className={'relative mt-7.5 px-6'}>
          <Typography className={'mb-4.5'} variant={'regular_text_16'}>
            We have sent a link to confirm your email to {email}
          </Typography>
          <Button onClick={onCloseModal} className={'float-right w-24'}>
            OK
          </Button>
        </div>
      </ModalWindow>
    </div>
  )
}
