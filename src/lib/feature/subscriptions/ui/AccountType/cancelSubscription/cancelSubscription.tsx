import { useState } from 'react'
import {
  useCancelSubscriptionMutation,
  useRenewAutoRenewalMutation,
} from '@/lib/feature/subscriptions/api/subscriptionApi'
import { Checkbox } from 'photo-flow-ui-kit'

type PropsType = {
  hasAutoRenewal: boolean
}

export const CancelSubscription = ({ hasAutoRenewal }: PropsType) => {
  const [renewal, setRenewal] = useState(hasAutoRenewal)

  const [cancelSubscription] = useCancelSubscriptionMutation()
  const [renewAutoSubscription] = useRenewAutoRenewalMutation()

  const handleToggleRenewal = async (checked: boolean) => {
    try {
      if (!checked) {
        await cancelSubscription().unwrap()
        setRenewal(false)
      } else {
        await renewAutoSubscription().unwrap()
        setRenewal(true)
      }
    } catch (err) {
      console.error('Failed to cancel subscription:', err)
    }
  }

  return (
    <div className={'mb-6 flex justify-between'}>
      <Checkbox
        checked={renewal}
        onCheckedChange={checked => handleToggleRenewal(checked as boolean)}
        id={'agreement'}
        label={'Auto-Renewal'}
      />
    </div>
  )
}
