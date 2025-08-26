'use client'
import { Typography } from 'photo-flow-ui-kit'
import Image from 'next/image'
import { Button } from 'photo-flow-ui-kit'
import { useResendPasswordEmailMutation } from '@/lib/feature/auth/api/authApi'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ModalWindow } from 'photo-flow-ui-kit'

export default function ExpiredPasswordPage() {
  const [isOpenModalWindow, setIsOpenModalWindow] = useState(false)

  const [resendPasswordLink] = useResendPasswordEmailMutation()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  const sendVerificationLink = async () => {
    try {
      await resendPasswordLink({
        email,
        baseUrl: window.location.origin + '/auth/forgot-password',
      })
      setIsOpenModalWindow(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={'flex h-full w-full flex-col items-center'}>
      <Typography className={'mb-5'} variant={'h1'}>
        Email verification link expired
      </Typography>
      <Typography className={'mb-[30px] max-w-[294px] text-center'} variant={'regular_text_16'}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <Button onClick={sendVerificationLink} className={'mb-9'}>
        Resend link
      </Button>
      <Image width={474} height={352} src={'/expired-email.webp'} alt={'expired email link'} />
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
    </div>
  )
}
