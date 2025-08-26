import { Checkbox } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import { Typography } from 'photo-flow-ui-kit'
import { useState } from 'react'
import { parseSubscription } from '@/lib/feature/subscriptions/utils/parseSubscription'
import { useCreatePaymentMutation } from '@/lib/feature/subscriptions/api/subscriptionApi'
import { useParams, useRouter } from 'next/navigation'

export const Agreement = ({ subscriptionCost }: { subscriptionCost: string }) => {
  const [agree, setAgree] = useState(false)

  const [createPayment, { isLoading }] = useCreatePaymentMutation()
  const router = useRouter()
  const params = useParams()

  const paymentHandler = async () => {
    const { price, type } = parseSubscription(subscriptionCost)

    try {
      const res = await createPayment({
        typeSubscription: type,
        paymentType: 'STRIPE',
        amount: price,
        baseUrl: window.location.origin + `/profile/${params.id}/ProfileSettings`,
      })
      router.push(res.data!.url)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={'flex justify-between'}>
      <Checkbox
        checked={agree}
        onCheckedChange={() => setAgree(prev => !prev)}
        id={'agreement'}
        label={'I agree'}
      />
      <Button disabled={!agree || isLoading} onClick={paymentHandler}>
        <Typography>OK</Typography>
      </Button>
    </div>
  )
}
