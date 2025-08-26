import React, { RefObject, useState } from 'react'
import { ModalWindow } from 'photo-flow-ui-kit'
import ArrowLeftIcon from '@/assets/icons/arrow-back.svg'
import { Button } from 'photo-flow-ui-kit'

import { Typography } from 'photo-flow-ui-kit'
import { Textarea } from 'photo-flow-ui-kit'
import { useAddPostMutation } from '@/lib/feature/posts/api/postsApi'
import { Slider } from 'photo-flow-ui-kit'

type PropsType = {
  uploadId: RefObject<string[]>
  imageUrls: string[]
}

export const AddPostDescription = (props: PropsType) => {
  const { imageUrls, uploadId } = props
  const [valueDescription, setValueDescription] = useState<string>('')
  const [isOpen, setIsOpen] = useState(true)

  const [addPost] = useAddPostMutation()

  const sendPublishToServer = async () => {
    const body = {
      description: valueDescription,
      childrenMetadata: uploadId.current.map(id => ({ uploadId: id })),
    }
    try {
      await addPost(body).unwrap()
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ModalWindow
      hiddenCloseButton={true}
      modalTitle={'Cropping'}
      className={'h-[564px] w-[972px] overflow-hidden text-center'}
      open={isOpen}
      onClose={() => null}
    >
      <ArrowLeftIcon
        width={'24px'}
        height={'24px'}
        className={'fill-light-100 absolute top-[17px] left-[0px] cursor-pointer'}
        onClick={() => {}}
      />
      <Button
        className={'absolute top-[10px] right-[24px] font-semibold'}
        variant={'text'}
        onClick={sendPublishToServer}
      >
        Publish
      </Button>
      <form className='relative flex h-[504px] w-full'>
        <div className='relative flex h-[504px] w-[490px]'>
          <div className='flex h-full w-full'>
            <Slider images={imageUrls} data={'uiData'} getId={s => s} getUrl={s => s} />
          </div>
        </div>

        <div className='w-[481px] p-[24px]'>
          <div className='mb-[24px] flex items-center gap-[12px]'>
            <span className='h-[36px] w-[36px] rounded-full bg-amber-700'></span>
            <Typography className='text-left' variant={'h2'}>
              URLProfile
            </Typography>
          </div>
          <Textarea
            maxLength={500}
            changeValue={setValueDescription}
            value={valueDescription}
            className={'text-regular-16 h-[120px] w-[433px] font-light'}
            textareaLabel={'Add publication descriptions'}
            placeholder={'Text-area'}
          />
          <div className='text-light-900 text-small-12 text-right'>
            {valueDescription.length}/500
          </div>
        </div>
      </form>
    </ModalWindow>
  )
}
