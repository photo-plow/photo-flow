'use client'

import { ModalWindow } from 'photo-flow-ui-kit'
import { Comment, getPostInformation, PostResponse } from '@/lib/feature/posts/api/postsApi.types'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Typography } from 'photo-flow-ui-kit'
import { Slider } from 'photo-flow-ui-kit'
import PostDescription from '@/lib/feature/posts/ui/post/postDescription/PostDescription'
import PostComment from '@/lib/feature/posts/ui/post/postComment/PostComment'
import PostFooter from '@/lib/feature/posts/ui/post/postFooter/PostFooter'
import Dots from '@/assets/icons/more-horizontal.svg'
import { useAppSelector } from '@/lib/hooks'
import { selectIsAuth } from '@/lib/appSlice'
import { useEffect, useState } from 'react'

import { twMerge } from 'tailwind-merge'
import PostMenu from '@/lib/feature/posts/ui/post/postMenu/PostMenu'
import ConfirmModal from './ConfirmModal/ConfirmModal'
import { useGetMeQuery } from '@/lib/feature/auth/api/authApi'
import { EditPostForm } from './EditPostForm/EditPostForm'
import DefaultAvatar from '@/../public/defaultAvatar.jpg'

type PropsType = {
  post: PostResponse
  comments: getPostInformation<Comment[]>
}

export default function PostModal({ post, comments }: PropsType) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isExit, setIsExit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [textValue, setTextValue] = useState<string>('')

  useEffect(() => {
    if (post?.description) {
      setTextValue(post.description)
    }
  }, [post])

  const router = useRouter()
  const { id } = useParams()

  // FIX: Не забыть убрать потом
  const { data } = useGetMeQuery()
  const userId = data?.userId

  const searchParams = useSearchParams()
  const postId = searchParams.get('postId')
  const isAuth = useAppSelector(selectIsAuth)

  const onCloseHandler = () => {
    if (!isEditMode) {
      return router.replace(`/profile/${id}`)
    }

    if (post.description === textValue) {
      setIsEditMode(false)
      setIsExit(false)
      return
    }
    setIsExit(true)
  }

  const showBlock = (value: boolean) => {
    setIsDelete(value)
  }

  return (
    <ModalWindow
      open={!!postId}
      modalTitle={isEditMode ? 'Edit Post' : ''}
      onClose={onCloseHandler}
      className={twMerge(
        'flex h-[565px] w-[972px]',
        isEditMode && 'grid grid-cols-[auto_1fr] grid-rows-[60px_1fr] gap-0'
      )}
    >
      <Slider
        getId={p => p.uploadId}
        getUrl={p => p.url}
        images={post.images}
        data={'serverData'}
        classname={twMerge('h-full', isEditMode ? 'col-span-1 row-span-1' : 'w-1/2')}
      />
      <div className={twMerge('relative h-full', isEditMode ? 'col-span-1 row-span-1' : 'w-1/2')}>
        <header className={'relative flex items-center gap-3 px-6 py-3'}>
          <Image
            width={36}
            height={36}
            src={post?.avatarOwner || DefaultAvatar}
            className={'rounded-full'}
            alt={'photo of creator'}
          />
          <Typography variant={'h3'}>{post.userName}</Typography>
          {isAuth && !isEditMode && (
            <Dots
              className={'fill-accent-500 absolute right-6 h-6 w-6 cursor-pointer'}
              onClick={() => {
                showBlock(!isDelete)
              }}
            />
          )}

          {isDelete && !isEditMode && (
            <PostMenu
              isUserPost={userId === Number(id)}
              onClose={() => setIsModalOpen(true)}
              onCloseMenu={() => setIsDelete(false)}
              onEditHandler={() => setIsEditMode(true)}
            />
          )}

          <ConfirmModal
            open={isExit}
            setIsModalOpen={setIsExit}
            onClose={() => setIsExit(false)}
            removeEditMode={() => {
              setIsEditMode(false)
              setTextValue(post.description)
            }}
            postId={post.id}
            className='h-[240px] w-[486px]'
            type='exit'
            confirmText='Do you really want to close the edition of the publication? If you close changes won’t be saved'
          />

          <ConfirmModal
            open={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onClose={() => setIsModalOpen(false)}
            postId={post.id}
            type='delete'
            confirmText='Are you sure you want to delete this post?'
          />
        </header>
        {!isEditMode ? (
          <>
            <section
              className={`border-dark-100 mb-3 ${isAuth ? 'max-h-[336px]' : 'max-h-[420px]'} w-[480px] overflow-y-auto border-t pt-5 pr-4 pl-6`}
            >
              {post.description && <PostDescription post={{ ...post, description: textValue }} />}
              {comments &&
                comments.items.map(c => <PostComment key={c.id} postId={post.id} comment={c} />)}
            </section>

            <PostFooter post={post} />
          </>
        ) : (
          <EditPostForm
            isEditMode={isEditMode}
            textValue={textValue}
            postId={post.id}
            setTextValue={setTextValue}
            setIsEditMode={setIsEditMode}
          />
        )}
      </div>
    </ModalWindow>
  )
}
