import { Card } from 'photo-flow-ui-kit'
import { Typography } from 'photo-flow-ui-kit'
import { Radio } from 'photo-flow-ui-kit'
import { useState } from 'react'
import { PaymentMethods } from '@/lib/feature/subscriptions/ui/AccountType/SubscriptionCost/PaymentMethods/PaymentMethods'

export const SubscriptionCost = ({ hasSubscription }: { hasSubscription: number | undefined }) => {
  const subscriptionCostOptions = [
    { title: '$10 per 1 Day', id: 'cost-1' },
    { title: '$50 per 7 Day', id: 'cost-2' },
    { title: '$100 per month', id: 'cost-3' },
  ]

  const [subscriptionCost, setSubscriptionCost] = useState(subscriptionCostOptions[0].title)

  return (
    <>
      <Typography variant={'h3'} className={'mb-4.5'}>
        {hasSubscription ? 'Change your subscription:' : 'Your subscription costs:'}
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
