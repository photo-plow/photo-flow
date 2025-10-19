'use client'
import { Typography } from 'photo-flow-ui-kit'
import Image from 'next/image'
import { Button } from 'photo-flow-ui-kit'
import { useResendPasswordEmailMutation } from '@/lib/feature/auth/api/authApi'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ModalWindow } from 'photo-flow-ui-kit'
import { useWithLocale } from '@/i18n/hooks'
import { useTranslation } from 'react-i18next'

export default function ExpiredPasswordPage() {
  const [isOpenModalWindow, setIsOpenModalWindow] = useState(false)
  const { t } = useTranslation()
  const [resendPasswordLink] = useResendPasswordEmailMutation()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const withLocale = useWithLocale()

  const sendVerificationLink = async () => {
    try {
      await resendPasswordLink({
        email,
        baseUrl: window.location.origin + withLocale('/auth/forgot-password'),
      })
      setIsOpenModalWindow(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={'flex h-full w-full flex-col items-center'}>
      <Typography className={'mb-5'} variant={'h1'}>
        {t('auth_emailExpired_title')}
      </Typography>
      <Typography className={'mb-[30px] max-w-[294px] text-center'} variant={'regular_text_16'}>
        {t('auth_emailExpired_desc')}
      </Typography>
      <Button onClick={sendVerificationLink} className={'mb-9'}>
        {t('auth_emailExpired_resend')}
      </Button>
      <Image width={474} height={352} src={'/expired-email.webp'} alt={'expired email link'} />
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
    </div>
  )
}
