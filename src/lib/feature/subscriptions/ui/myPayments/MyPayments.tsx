'use client'

import { twMerge } from 'tailwind-merge'
import { useGetMyPaymentsQuery } from '@/lib/feature/subscriptions/api/subscriptionApi'
import { Loader } from 'photo-flow-ui-kit'
import { formatDateToDotFormat } from '@/utils'
import { Typography } from 'photo-flow-ui-kit'
import { useTranslation } from 'react-i18next'

const headerKeys = [
  'payments_header_date',
  'payments_header_endDate',
  'payments_header_price',
  'payments_header_subType',
  'payments_header_paymentType',
] as const

const costPayments = {
  DAY: { amount: 10, typeKey: 'subscription_type_day' },
  WEEKLY: { amount: 50, typeKey: 'subscription_type_weekly' },
  MONTHLY: { amount: 100, typeKey: 'subscription_type_monthly' },
} as const

const paymentsType = {
  STRIPE: 'payment_type_stripe',
  PAYPAL: 'payment_type_paypal',
  CREDIT_CARD: 'payment_type_creditCard',
} as const

export const MyPayments = () => {
  const { data, isLoading } = useGetMyPaymentsQuery()
  const { t } = useTranslation()

  if (isLoading) {
    return <Loader />
  }

  const normalizedData = data?.map(elem => {
    return {
      dateOfPayment: formatDateToDotFormat(elem.dateOfPayment),
      endDateOfSubscription: formatDateToDotFormat(elem.endDateOfSubscription),
      paymentType: t(paymentsType[elem.paymentType]),
      price: `$${costPayments[elem.subscriptionType].amount}`,
      subscriptionId: elem.subscriptionId,
      subscriptionType: t(costPayments[elem.subscriptionType].typeKey),
      userId: elem.userId,
    }
  })

  if (!data?.length)
    return (
      <Typography variant={'large'} className={'text-center'}>
        {t('payments_empty')}
      </Typography>
    )

  return (
    <table className={'w-full'}>
      <thead className={'h-[48px] gap-[72px]'}>
        <tr className={'bg-dark-500 h-[48px] text-left'}>
          {headerKeys.map((header, index) => (
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
