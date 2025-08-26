'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from 'photo-flow-ui-kit'
import { GeneralInformation } from '@/lib/feature/profile/ui/components/profile/GeneralInformation/GeneralInformation'
import { AccountType } from '@/lib/feature/subscriptions/ui/AccountType/AccountType'
import { ModalWindow } from 'photo-flow-ui-kit'
import { Typography } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useGetMeQuery } from '@/lib/feature/auth/api/authApi'
import { Loader } from 'photo-flow-ui-kit'
import { MyPayments } from '@/lib/feature/subscriptions/ui/myPayments/MyPayments'

const ProfileSettings = () => {
  const router = useRouter()
  const profileParams = useParams()
  const params = useSearchParams()
  const success = params.get('success')
  const [isModalOpen, setIsModalOpen] = useState(!!success)
  const { data } = useGetMeQuery()

  if (!data) return <Loader />

  if (String(profileParams.id) !== String(data.userId)) {
    router.replace(`/profile/${profileParams.id}`)
    return null
  }

  const onCloseModalWindow = () => {
    setIsModalOpen(false)
    return null
  }

  return (
    <div className='mb-[26px]'>
      <Tabs defaultValue='General information'>
        <TabsList className='flex w-full'>
          <TabsTrigger value='General information' className='flex-1'>
            General information
          </TabsTrigger>
          <TabsTrigger value='Devices' className='flex-1'>
            Devices
          </TabsTrigger>
          <TabsTrigger value='Account Management' className='flex-1'>
            Account Management
          </TabsTrigger>
          <TabsTrigger value='My payments' className='flex-1'>
            My payments
          </TabsTrigger>
        </TabsList>
        <TabsContent value='General information'>
          <GeneralInformation />
        </TabsContent>
        <TabsContent value='Devices'>Devices</TabsContent>
        <TabsContent value='Account Management'>
          <AccountType />
        </TabsContent>
        <TabsContent value='My payments'>
          <MyPayments />
        </TabsContent>
      </Tabs>
      {success === 'true' ? (
        <ModalWindow
          className={'h-[228px] w-[376px]'}
          modalTitle={'Success'}
          open={isModalOpen}
          onClose={onCloseModalWindow}
        >
          <div className={'px-6 pt-4.5 pb-9'}>
            <Typography variant={'regular_text_16'} className={'mb-[54px]'}>
              Payment was successful!
            </Typography>
            <Button className={'w-full'} onClick={onCloseModalWindow}>
              OK
            </Button>
          </div>
        </ModalWindow>
      ) : (
        <ModalWindow
          className={'h-[228px] w-[376px]'}
          modalTitle={'Error'}
          open={isModalOpen}
          onClose={onCloseModalWindow}
        >
          <div className={'px-6 pt-4.5 pb-9'}>
            <Typography variant={'regular_text_16'} className={'mb-[54px]'}>
              Transaction failed. Please, write to support
            </Typography>
            <Button className={'w-full'} onClick={onCloseModalWindow}>
              Back to payment
            </Button>
          </div>
        </ModalWindow>
      )}
    </div>
  )
}

export default ProfileSettings
