'use client'

import { Card } from 'photo-flow-ui-kit'
import PaypalIcon from '@/assets/icons/paypal.svg'
import { Typography } from 'photo-flow-ui-kit'
import StripeIcon from '@/assets/icons/stripe.svg'
import { Agreement } from '@/lib/feature/subscriptions/ui/AccountType/SubscriptionCost/PaymentMethods/Agreement/Agreement'
import { ModalWindow } from 'photo-flow-ui-kit'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const PaymentMethods = ({ subscriptionCost }: { subscriptionCost: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <>
      <div className={'flex items-center justify-end gap-[54px]'}>
        <Card className={'flex items-center justify-center'}>
          <PaypalIcon className={'h-16 w-24 cursor-pointer'} />
        </Card>
        <Typography variant={'regular_text_14'}>{t('common_or')}</Typography>
        <Card className={'flex items-center justify-center'}>
          <StripeIcon onClick={() => setIsModalOpen(true)} className={'h-16 w-24 cursor-pointer'} />
        </Card>
      </div>
      <ModalWindow
        modalTitle={t('subscription_createPayment_title')}
        open={isModalOpen}
        className={'h-[252px] w-[378px]'}
        onClose={() => setIsModalOpen(false)}
      >
        <div className={'px-6 pt-7.5 pb-9'}>
          <Typography variant={'regular_text_16'} className={'mb-4.5'}>
            {t('subscription_autorenew_note')}
          </Typography>
          <Agreement subscriptionCost={subscriptionCost} />
        </div>
      </ModalWindow>
    </>
  )
}
