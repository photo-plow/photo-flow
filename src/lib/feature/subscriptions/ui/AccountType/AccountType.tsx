'use client'

import { Typography } from 'photo-flow-ui-kit'
import { Card } from 'photo-flow-ui-kit'
import { Radio } from 'photo-flow-ui-kit'
import { memo, useEffect, useMemo, useState } from 'react'
import { SubscriptionCost } from '@/lib/feature/subscriptions/ui/AccountType/SubscriptionCost/SubscriptionCost'
import { CurrentSubscription } from '@/lib/feature/subscriptions/ui/AccountType/currentSubscription/CurrentSubscription'
import { useGetCurrentSubscriptionQuery } from '@/lib/feature/subscriptions/api/subscriptionApi'
import { Loader } from 'photo-flow-ui-kit'
import { useTranslation } from 'react-i18next'

export const AccountType = memo(() => {
  const { t } = useTranslation()
  const accountTypeOptions = [
    { title: t('accountType_personal'), id: 'personal-id' },
    { title: t('accountType_business'), id: 'business-id' },
  ]

  const { data, isLoading } = useGetCurrentSubscriptionQuery()
  const currentSubscriptions = useMemo(() => data, [data])

  const [accountType, setAccountType] = useState<string>('')

  useEffect(() => {
    if (!isLoading && data) {
      setAccountType(data.data.length ? t('accountType_business') : t('accountType_personal'))
    }
  }, [data, isLoading])

  if (isLoading) return <Loader />
  if (!accountType) return null

  return (
    <>
      <CurrentSubscription currentSubscriptions={currentSubscriptions} />
      <Typography variant={'h3'} className={'mb-4.5'}>
        {t('accountType_title')}
      </Typography>
      <Card className={'mb-10.5 px-3 py-1.5'}>
        <Radio
          className={'flex-col gap-3'}
          items={accountTypeOptions}
          value={accountType}
          onValueChange={setAccountType}
        />
      </Card>
      {accountType === t('accountType_business') && (
        <SubscriptionCost hasSubscription={data?.data.length} />
      )}
    </>
  )
})

AccountType.displayName = 'AccountType'
