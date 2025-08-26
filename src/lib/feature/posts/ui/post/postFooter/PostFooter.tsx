import React from 'react'
import Image from 'next/image'
import { Typography } from 'photo-flow-ui-kit'
import { formatDate } from '@/utils'
import { PostResponse } from '@/lib/feature/posts/api/postsApi.types'
import HeartOutline from '@/assets/icons/heart-outline.svg'
import PaperPlane from '@/assets/icons/paper-plane-outline.svg'
import Bookmark from '@/assets/icons/bookmark-outline.svg'
import { useAppSelector } from '@/lib/hooks'
import { selectIsAuth } from '@/lib/appSlice'
import { Button } from 'photo-flow-ui-kit'
import { Textarea } from 'photo-flow-ui-kit'

function PostFooter({ post }: { post: PostResponse }) {
  const isAuth = useAppSelector(selectIsAuth)

  return (
    <footer className={'border-dark-100 absolute bottom-0 w-full border-t pt-3'}>
      <div className={'px-6'}>
        {isAuth && (
          <div className={'flex justify-between'}>
            <div className={'flex gap-6'}>
              <HeartOutline className={'mb-5 h-6 w-6 cursor-pointer'} />
              <PaperPlane className={'h-6 w-6 cursor-pointer'} />
            </div>
            <Bookmark className={'h-6 w-6 cursor-pointer'} />
          </div>
        )}
        <div className={'flex gap-3'}>
          <div className={'flex -space-x-2'}>
            {post.avatarWhoLikes.slice(0, 3).map((avatar, index) => (
              <div key={avatar} style={{ zIndex: 10 - index }}>
                <Image
                  width={24}
                  height={24}
                  className={'rounded-full'}
                  src={avatar}
                  alt={'avatars who likes post'}
                />
              </div>
            ))}
          </div>
          <Typography variant={'regular_text_14'} className={'mb-1'}>
            {post.likesCount}
            <Typography variant={'bold_text_14'}> Like</Typography>
          </Typography>
        </div>
        <Typography
          variant={'small_text'}
          className={`text-light-900 block ${isAuth ? 'mb-2' : 'mb-6.5'}`}
        >
          {formatDate(post.createdAt)}
        </Typography>
      </div>
      {isAuth && (
        <div
          className={
            'border-dark-100 flex max-h-15 w-full items-center justify-between border-t px-6 py-3'
          }
        >
          <Textarea
            placeholder={'Add a Comment...'}
            className={'text-regular-14 h-6 w-[328px] border-none bg-transparent p-0'}
          />
          <Button variant={'text'} className={'px-3'}>
            <Typography variant={'h3'}>Publish</Typography>
          </Button>
        </div>
      )}
    </footer>
  )
}

export default PostFooter
