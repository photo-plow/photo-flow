'use client'

import { twMerge } from 'tailwind-merge'
import { useGetMyPaymentsQuery } from '@/lib/feature/subscriptions/api/subscriptionApi'
import { Loader } from 'photo-flow-ui-kit'
import { formatDateToDotFormat } from '@/utils'
import { Typography } from 'photo-flow-ui-kit'

const headers = [
  'Date of Payments',
  'End date of subscription',
  'Price',
  'Subscription type',
  'Payment Type',
]

const costPayments = {
  DAY: {
    amount: 10,
    typeDescription: '1 day',
  },
  WEEKLY: {
    amount: 50,
    typeDescription: '7 days',
  },
  MONTHLY: {
    amount: 100,
    typeDescription: '1 month',
  },
}

const paymentsType = {
  STRIPE: 'Stripe',
  PAYPAL: 'PayPal',
  CREDIT_CARD: 'Credit Card',
}

export const MyPayments = () => {
  const { data, isLoading } = useGetMyPaymentsQuery()
  if (isLoading) {
    return <Loader />
  }

  const normalizedData = data?.map(elem => {
    return {
      dateOfPayment: formatDateToDotFormat(elem.dateOfPayment),
      endDateOfSubscription: formatDateToDotFormat(elem.endDateOfSubscription),
      paymentType: paymentsType[elem.paymentType],
      price: `$${costPayments[elem.subscriptionType].amount}`,
      subscriptionId: elem.subscriptionId,
      subscriptionType: costPayments[elem.subscriptionType].typeDescription,
      userId: elem.userId,
    }
  })

  if (!data?.length)
    return (
      <Typography variant={'large'} className={'text-center'}>
        You have no payments
      </Typography>
    )

  return (
    <table className={'w-full'}>
      <thead className={'h-[48px] gap-[72px]'}>
        <tr className={'bg-dark-500 h-[48px] text-left'}>
          {headers.map((header, index) => (
            <th
              key={index}
              className={twMerge(
                'text-bold-14 py-[12px]',
                index === 1 ? 'pl-[24px]' : index === 2 ? 'pl-[0]' : 'px-[24px]'
              )}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {normalizedData?.map((row, rowIndex) => (
          <tr key={rowIndex} className={'border-dark-500 text-regular-14 h-[47px] border'}>
            <td className={'px-[24px] py-[11px]'}>{row.dateOfPayment}</td>
            <td className={'py-[11px] pl-[24px]'}>{row.endDateOfSubscription}</td>
            <td className={'py-[11px] pr-[24px]'}>{row.price}</td>
            <td className={'px-[24px] py-[11px]'}>{row.subscriptionType}</td>
            <td className={'px-[24px] py-[11px]'}>{row.paymentType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
