import React from 'react'
import ClosePicture from '@/assets/icons/close.svg'
import PlusIcon from '@/assets/icons/plus-circle.svg'
import Image from 'next/image'
import { MAX_FILE_SIZE, MAX_FILES } from '@/constants'
import { useTranslation } from 'react-i18next'

type PropsType = {
  imageUrls: string[]
  inputRef: React.RefObject<HTMLInputElement | null>
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>
  setFilesImg: React.Dispatch<React.SetStateAction<File[]>>
}

export const GalleryPreview = (props: PropsType) => {
  const { imageUrls, inputRef, setImageUrls, setFilesImg } = props
  const { t } = useTranslation()

  const addNewFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])

    const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE)

    if (validFiles.length < files.length) {
      const oversized = files.filter(file => file.size > MAX_FILE_SIZE)
      alert(
        t('posts_error_filesTooLarge', { sizeMB: Math.round(MAX_FILE_SIZE / (1024 * 1024)) }) +
          '\n' +
          oversized.map(f => f.name).join(', ')
      )
      return
    }

    if (validFiles.length > MAX_FILES) {
      alert(t('posts_error_maxFiles', { max: MAX_FILES }))
      return
    }

    setFilesImg(prev => [...prev, ...validFiles].slice(0, MAX_FILES))

    const newUrls = validFiles.map(file => URL.createObjectURL(file))
    setImageUrls(prev => [...prev, ...newUrls].slice(0, MAX_FILES))
    if (validFiles.length < 1) {
      return
    }
  }
  const removeFile = (removeIdx: number) => {
    setImageUrls(prev => prev.filter((_, idx) => idx !== removeIdx))
    setFilesImg(prev => prev.filter((_, idx) => idx !== removeIdx))
  }
  return (
    <div className='absolute right-[12px] bottom-[60px] z-11 ml-[12px] flex gap-[12px] rounded-[2px] bg-[#171717C3] p-[12px]'>
      <div className='flex max-w-[360px] gap-[12px] overflow-x-auto'>
        {imageUrls.map((url, idx) => (
          <div key={idx} className='relative h-[80px] w-[80px] flex-shrink-0'>
            <Image
              src={url}
              alt={t('posts_gallery_photoAlt', { index: idx + 1 })}
              className='h-[80px] w-[80px] rounded-[2px] object-cover'
              width={80}
              height={80}
            />
            <div
              onClick={() => removeFile(idx)}
              className='absolute top-[2px] right-[2px] cursor-pointer rounded-[2px] bg-[#171717C3] p-[3px]'
            >
              <ClosePicture className='h-[6px] w-[6px]' />
            </div>
          </div>
        ))}
      </div>

      <label>
        <PlusIcon
          width={'36px'}
          height={'36px'}
          className='cursor-pointer'
          onClick={() => inputRef.current?.files}
        />
        <input
          multiple
          accept='image/jpeg, image/png'
          type='file'
          className={'hidden'}
          ref={inputRef}
          onChange={addNewFile}
        />
      </label>
    </div>
  )
}
