'use client'

import { Card } from 'photo-flow-ui-kit'
import { Typography } from 'photo-flow-ui-kit'
import { Radio } from 'photo-flow-ui-kit'
import { useState } from 'react'
import { PaymentMethods } from '@/lib/feature/subscriptions/ui/AccountType/SubscriptionCost/PaymentMethods/PaymentMethods'
import { useTranslation } from 'react-i18next'

export const SubscriptionCost = ({ hasSubscription }: { hasSubscription: number | undefined }) => {
  const { t } = useTranslation()
  const subscriptionCostOptions = [
    { title: t('subscription_cost_option_1'), id: 'cost-1' },
    { title: t('subscription_cost_option_2'), id: 'cost-2' },
    { title: t('subscription_cost_option_3'), id: 'cost-3' },
  ]

  const [subscriptionCost, setSubscriptionCost] = useState(subscriptionCostOptions[0].title)

  return (
    <>
      <Typography variant={'h3'} className={'mb-4.5'}>
        {hasSubscription ? t('subscription_change_title') : t('subscription_costs_title')}
      </Typography>
      <Card className={'mb-6 px-3 py-1.5'}>
        <Radio
          className={'flex flex-col gap-3'}
          items={subscriptionCostOptions}
          value={subscriptionCost}
          onValueChange={setSubscriptionCost}
        />
      </Card>
      <PaymentMethods subscriptionCost={subscriptionCost} />
    </>
  )
}
