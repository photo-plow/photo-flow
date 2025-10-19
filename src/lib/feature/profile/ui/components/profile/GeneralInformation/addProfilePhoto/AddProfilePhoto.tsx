'use client'

import { Button } from 'photo-flow-ui-kit'
import NoImage from '@/assets/icons/img.svg'
import { useState } from 'react'
import { AddAvatarModal } from '@/lib/feature/profile/ui/components/profile/GeneralInformation/addProfilePhoto/addAvatarModal/AddAvatarModal'
import { useGetProfileQuery } from '@/lib/feature/profile/api/profileApi'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export const AddProfilePhoto = () => {
  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false)
  const { data, refetch } = useGetProfileQuery()
  const { t } = useTranslation()

  return (
    <div className='flex w-[196px] flex-col items-center'>
      {data?.avatars[0]?.url ? (
        <Image
          src={data.avatars[0].url}
          alt={t('profile_avatar_alt')}
          width={192}
          height={192}
          className={'rounded-full'}
        />
      ) : (
        <NoImage className={`bg-dark-500 h-[192px] w-[192px] rounded-full p-[72px]`} />
      )}
      <Button
        className={'mt-[24px] h-[36px] w-[201px]'}
        variant='outline'
        onClick={() => setModalIsOpened(true)}
      >
        {t('profile_selectPhoto')}
      </Button>
      <AddAvatarModal
        isOpen={modalIsOpened}
        closeModalAction={() => setModalIsOpened(false)}
        refetchAvatarImageAction={refetch}
      />
    </div>
  )
}
