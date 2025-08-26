import React from 'react'
import { ModalWindow } from 'photo-flow-ui-kit'
import { Typography } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import { useRouter } from 'next/navigation'
import { useRemovePostMutation } from '@/lib/feature/posts/api/postsApi'
import { twMerge } from 'tailwind-merge'

type PostActionsModalProps = {
  open: boolean
  onClose: () => void
  removeEditMode?: () => void
  setIsModalOpen: (isModalOpen: boolean) => void
  postId: number
  type: 'delete' | 'exit'
  className?: string
  confirmText: string
}

function ConfirmModal({
  open,
  onClose,
  postId,
  setIsModalOpen,
  type,
  className,
  confirmText,
  removeEditMode,
}: PostActionsModalProps) {
  const router = useRouter()

  const [deletePost] = useRemovePostMutation()

  const postRemoveHandler = async () => {
    setIsModalOpen(true)
    try {
      await deletePost(postId).unwrap()
      router.back()
    } catch (error) {
      console.error('The post has not been found', error)
    } finally {
      setIsModalOpen(false)
    }
  }
  return (
    <ModalWindow
      modalTitle={type === 'delete' ? 'Delete Post' : 'Close Post'}
      open={open}
      className={twMerge('h-[216px] w-[378px]', className)}
      onClose={onClose}
    >
      <div className='relative mt-7.5 px-6'>
        <div className='pb-7.5'>
          <Typography variant='regular_text_16'>{confirmText}</Typography>
        </div>
        <div className='flex justify-end gap-6'>
          <Button
            variant={'outline'}
            onClick={() => {
              if (type === 'exit') {
                onClose()
                removeEditMode!()
              }

              if (type === 'delete') {
                postRemoveHandler()
              }
            }}
            className='w-24'
          >
            Yes
          </Button>
          <Button onClick={onClose} className='w-24'>
            No
          </Button>
        </div>
      </div>
    </ModalWindow>
  )
}

export default ConfirmModal
