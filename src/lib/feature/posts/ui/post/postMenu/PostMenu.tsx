import React from 'react'
import { Typography } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import EditIcon from '@/assets/icons/edit-pencil.svg'
import TrashIcon from '@/assets/icons/trash.svg'

type PostMenuProps = {
  onClose: () => void
  onEditHandler: () => void
  onCloseMenu: () => void
  isUserPost: boolean
}

function PostMenu({ onClose, onEditHandler, onCloseMenu, isUserPost }: PostMenuProps) {
  return (
    <div
      className={
        'border-dark-100 bg-dark-500 absolute top-18 right-6 flex h-[85px] w-[137px] items-center justify-center'
      }
    >
      <div>
        <Button
          className={'mb-3 p-0'}
          variant={'text'}
          onClick={() => {
            // Заглушка, чтобы не изменить чужой пост. Временно
            if (isUserPost) {
              onCloseMenu()
              onEditHandler()
              return
            }

            alert(`Is isn't your post!`)
          }}
        >
          <EditIcon className={'fill-light-100 mr-3 h-6 w-6'} />
          <Typography className={'text-light-100'} variant={'regular_text_14'}>
            Edit Post
          </Typography>
        </Button>

        <Button
          className={'p-0'}
          onClick={() => {
            if (isUserPost) {
              // Заглушка, чтобы не удалить чужой пост. Временно
              onCloseMenu()
              onClose()

              return
            }

            alert(`Is isn't your post!`)
          }}
          variant={'text'}
        >
          <TrashIcon className={'fill-light-100 mr-3 h-6 w-5'} />
          <Typography className={'text-light-100'} variant={'regular_text_14'}>
            Delete Post
          </Typography>
        </Button>
      </div>
    </div>
  )
}

export default PostMenu
