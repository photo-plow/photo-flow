import { Typography } from 'photo-flow-ui-kit'
import { Card } from 'photo-flow-ui-kit'
import { formatDateToDotFormat } from '@/utils'
import { getCurrentSubscriptionResponse } from '@/lib/feature/subscriptions/api/subscriptionApi.types'
import { memo } from 'react'
import { CancelSubscription } from '@/lib/feature/subscriptions/ui/AccountType/cancelSubscription/cancelSubscription'

type PropsType = {
  currentSubscriptions: getCurrentSubscriptionResponse | undefined
}

export const CurrentSubscription = memo(({ currentSubscriptions }: PropsType) => {
  if (!currentSubscriptions?.data.length) return null

  return (
    <>
      <Typography variant={'h3'} className={'mb-4.5'}>
        Current Subscription:
      </Typography>
      <Card className={'mb-3 px-6 py-3'}>
        <table className={'border-collapse'}>
          <thead className={'text-left'}>
            <tr>
              <th>
                <Typography variant={'regular_text_14'} className={'text-light-900 mb-3'}>
                  Expire at
                </Typography>
              </th>
              <th>
                <Typography variant={'regular_text_14'} className={'text-light-900 mb-3'}>
                  Next payment
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentSubscriptions?.data.map(subscription => (
              <tr key={subscription.subscriptionId}>
                <td className={'pr-11'}>
                  <Typography variant={'bold_text_14'}>
                    {formatDateToDotFormat(subscription.endDateOfSubscription)}
                  </Typography>
                </td>
                <td>
                  <Typography variant={'bold_text_14'}>
                    {formatDateToDotFormat(subscription.endDateOfSubscription)}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <CancelSubscription hasAutoRenewal={currentSubscriptions?.hasAutoRenewal} />
    </>
  )
})

CurrentSubscription.displayName = 'CurrentSubscription'
