import { Card } from 'photo-flow-ui-kit'
import PaypalIcon from '@/assets/icons/paypal.svg'
import { Typography } from 'photo-flow-ui-kit'
import StripeIcon from '@/assets/icons/stripe.svg'
import { Agreement } from '@/lib/feature/subscriptions/ui/AccountType/SubscriptionCost/PaymentMethods/Agreement/Agreement'
import { ModalWindow } from 'photo-flow-ui-kit'
import { useState } from 'react'

export const PaymentMethods = ({ subscriptionCost }: { subscriptionCost: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className={'flex items-center justify-end gap-[54px]'}>
        <Card className={'flex items-center justify-center'}>
          <PaypalIcon className={'h-16 w-24 cursor-pointer'} />
        </Card>
        <Typography variant={'regular_text_14'}>Or</Typography>
        <Card className={'flex items-center justify-center'}>
          <StripeIcon onClick={() => setIsModalOpen(true)} className={'h-16 w-24 cursor-pointer'} />
        </Card>
      </div>
      <ModalWindow
        modalTitle={'Create payment'}
        open={isModalOpen}
        className={'h-[252px] w-[378px]'}
        onClose={() => setIsModalOpen(false)}
      >
        <div className={'px-6 pt-7.5 pb-9'}>
          <Typography variant={'regular_text_16'} className={'mb-4.5'}>
            Auto-renewal will be enabled with this payment. You can disable it anytime in your
            profile settings
          </Typography>
          <Agreement subscriptionCost={subscriptionCost} />
        </div>
      </ModalWindow>
    </>
  )
}
