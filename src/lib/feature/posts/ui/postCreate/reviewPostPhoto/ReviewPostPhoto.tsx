import React, { useState } from 'react'
import { ModalWindow } from 'photo-flow-ui-kit'
import ArrowLeftIcon from '@/assets/icons/arrow-back.svg'
import { Button } from 'photo-flow-ui-kit'
import IconImg from '@/assets/icons/img.svg'
import { GalleryPreview } from '@/lib/feature/posts/ui/postCreate/reviewPostPhoto/galleryPreview/GalleryPreview'
import { NavigationFormType } from '@/lib/feature/posts/ui/postCreate/PostCreate'
import { Slider } from 'photo-flow-ui-kit'

type PropsType = {
  setFormNavigation: (value: NavigationFormType) => void
  sendFilesToServer: () => void
  setFilesImg: React.Dispatch<React.SetStateAction<File[]>>
  imageUrls: string[]
  inputRef: React.RefObject<HTMLInputElement | null>
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
}

export const ReviewPostPhoto = (props: PropsType) => {
  const { imageUrls, inputRef, setImageUrls, setFilesImg, sendFilesToServer, setFormNavigation } =
    props
  const [openPreview, setOpenPreview] = useState<boolean>(false)
  const resetPreview = () => {
    setFormNavigation('addFiles')
  }

  return (
    <ModalWindow
      hiddenCloseButton={true}
      modalTitle={'Cropping'}
      className={'h-[564px] w-[492px] overflow-hidden text-center'}
      open={true}
      onClose={() => null}
    >
      <ArrowLeftIcon
        width={'24px'}
        height={'24px'}
        className={'fill-light-100 absolute top-[17px] left-[0px] cursor-pointer'}
        onClick={resetPreview}
      />
      <Button
        className={'absolute top-[10px] right-[24px] font-semibold'}
        variant={'text'}
        onClick={sendFilesToServer}
      >
        Next
      </Button>
      <form className='relative flex h-[504px] w-[490px]'>
        <Slider images={imageUrls} data={'uiData'} getId={s => s} getUrl={s => s} />
        {openPreview && (
          <GalleryPreview
            setFilesImg={setFilesImg}
            setImageUrls={setImageUrls}
            inputRef={inputRef}
            imageUrls={imageUrls}
          />
        )}

        <button
          type='button'
          onClick={() => setOpenPreview(!openPreview)}
          className={
            'absolute right-[10px] bottom-[10px] z-11 cursor-pointer rounded-[2px] bg-[#171717C3] p-[6px]'
          }
        >
          <IconImg className={`h-[24px] w-[24px] ${openPreview && 'fill-accent-500'}`} />
        </button>
      </form>
    </ModalWindow>
  )
}
