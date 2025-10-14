import React, { useState } from 'react'
import { ModalWindow } from 'photo-flow-ui-kit'
import IconImg from '@/assets/icons/img.svg'
import { NavigationFormType } from '@/lib/feature/posts/ui/postCreate/PostCreate'
import { MAX_FILE_SIZE, MAX_FILES } from '@/constants'
import { useTranslation } from 'react-i18next'

export type PropsType = {
  setFilesImg: React.Dispatch<React.SetStateAction<File[]>>
  setImageUrls: (value: string[]) => void
  setFormNavigation: (value: NavigationFormType) => void
  inputRef: React.RefObject<HTMLInputElement | null>
}
export const AddPostPhoto = (props: PropsType) => {
  const { setImageUrls, setFormNavigation, inputRef, setFilesImg } = props
  const [isOpen, setIsOpen] = useState(true)
  const { t } = useTranslation()

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])

    setImageUrls(files.map(file => URL.createObjectURL(file)))

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
    setFormNavigation('review')
    e.target.value = ''
  }

  return (
    <ModalWindow
      modalTitle={t('posts_create_title')}
      className={'h-[564px] w-[492px] px-[10px]'}
      open={isOpen}
      onClose={() => setIsOpen(!isOpen)}
    >
      <form className='flex flex-col items-center justify-center pt-[72px]'>
        <div
          className={
            'bg-dark-500 inline-flex min-h-[228px] max-w-[400px] min-w-[222px] items-center justify-center'
          }
        >
          <IconImg className='h-[46px] w-[46px] fill-white' />
        </div>

        <label
          className={
            'bg-accent-500 text-regular-16 mt-[60px] flex h-[36px] w-[220px] cursor-pointer items-center justify-center rounded-[2px]'
          }
        >
          {t('posts_selectFromComputer')}
          <input
            multiple
            accept='image/jpeg, image/png'
            type='file'
            className={'hidden'}
            onChange={selectFile}
            ref={inputRef}
          />
        </label>
      </form>
    </ModalWindow>
  )
}
