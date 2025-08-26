'use client'

import { ModalWindow } from 'photo-flow-ui-kit'
import DefaultImg from '@/assets/icons/img.svg'
import { ChangeEvent, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Typography } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import { MAX_AVATAR_SIZE } from '@/constants'
import Image from 'next/image'
import { useUpdateAvatarMutation } from '@/lib/feature/profile/api/profileApi'

type Props = {
  isOpen: boolean
  closeModalAction: () => void
  refetchAvatarImageAction: () => void
}

export const AddAvatarModal = ({ closeModalAction, isOpen, refetchAvatarImageAction }: Props) => {
  const [avatarImage, setAvatarImage] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const fileRef = useRef<File | null>(null)
  const [trigger] = useUpdateAvatarMutation()

  function handleChangePhoto() {
    if (inputRef.current) inputRef.current.click()
  }

  function inputHandleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      setError('The format of the uploaded photo must be PNG and JPEG')
      return
    }
    if (file.size > MAX_AVATAR_SIZE) {
      setError('Photo size must be less that 10MB!')
      return
    }
    setError(null)
    const imageUrl = URL.createObjectURL(file)
    setAvatarImage(imageUrl)
    fileRef.current = file
  }

  function closeModalHandler() {
    closeModalAction()
    setAvatarImage('')
  }

  async function saveButtonHandler() {
    if (!fileRef.current) return
    try {
      const formData = new FormData()
      formData.append('file', fileRef.current)
      await trigger(formData)
      closeModalHandler()
      refetchAvatarImageAction()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ModalWindow
      modalTitle={'Add a Profile Photo'}
      className={twMerge('w-[492px]', inputRef ? 'h-[536px]' : 'h-[564px]')}
      open={isOpen}
      onClose={closeModalHandler}
    >
      <div className={'flex h-full w-full flex-col items-center'}>
        {error && (
          <div
            className={
              'bg-danger-900 border-danger-500 mt-[24px] w-[445px] border px-[48px] py-[6px] text-center'
            }
          >
            <Typography variant={'regular_text_14'}>
              <span className={'font-bold'}>Error!</span> {error}
            </Typography>
          </div>
        )}
        {avatarImage ? (
          <div className={'mt-[28px]'}>
            <div className={'relative h-[340px] w-[332px] overflow-hidden'}>
              <svg className='absolute inset-0 h-full w-full'>
                <defs>
                  <mask id='circle-mask'>
                    <rect width='100%' height='100%' fill='white' />
                    <circle cx='50%' cy='50%' r='158px' fill='black' />
                  </mask>
                </defs>
                <rect width='100%' height='100%' fill='rgba(0,0,0,0.7)' mask='url(#circle-mask)' />
              </svg>
              <Image
                height={340}
                width={332}
                src={avatarImage}
                alt={'preloadPhoto'}
                className={'h-full w-full object-cover'}
              />
            </div>
            <Button
              className={
                'absolute right-[-13px] bottom-[36px] h-[36px] w-[86px] translate-x-[-50%] translate-y-[0%]'
              }
              onClick={saveButtonHandler}
            >
              Save
            </Button>
          </div>
        ) : (
          <div>
            <div
              className={twMerge(
                'bg-dark-500 flex h-[228px] w-[222px] items-center justify-center rounded-[2px]',
                error ? 'mt-[24px]' : 'mt-[70px]'
              )}
            >
              <DefaultImg className={'h-[48px] w-[48px]'} />
            </div>
            <Button onClick={handleChangePhoto} className={'mt-[60px] h-[36px] w-[219px]'}>
              Select from computer
              <input
                ref={inputRef}
                type='file'
                accept='image/png, image/jpeg'
                style={{ display: 'none' }}
                onChange={inputHandleChange}
              />
            </Button>
          </div>
        )}
      </div>
    </ModalWindow>
  )
}
