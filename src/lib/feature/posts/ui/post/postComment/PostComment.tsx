'use client'

import Image from 'next/image'
import { Typography } from 'photo-flow-ui-kit'
import { formatTimeAgo } from '@/utils'
import { Comment } from '@/lib/feature/posts/api/postsApi.types'
import { useLazyGetCommentAnswerQuery } from '@/lib/feature/posts/api/postsApi'
import PostAnswer from '@/lib/feature/posts/ui/post/postComment/postAnswer/PostAnswer'
import DefaultAvatar from '@/../public/defaultAvatar.jpg'
import { useTranslation } from 'react-i18next'

type PropsType = {
  postId: number
  comment: Comment
}

function PostComment({ postId, comment }: PropsType) {
  const { t } = useTranslation()
  const [trigger, { data }] = useLazyGetCommentAnswerQuery()

  const viewAnswerHandler = (commentId: number) => {
    trigger({ postId, commentId })
  }
  return (
    <div key={comment.id}>
      <div className={'flex gap-3'}>
        <div className={'h-9 max-w-9'}>
          <Image
            width={36}
            height={36}
            src={comment.from.avatars[1].url || DefaultAvatar}
            className={'max-w-9 rounded-full'}
            alt={t('posts_commenter_imgAlt')}
          />
        </div>
        <div>
          <Typography variant={'regular_text_14'} className={'mb-1'}>
            <Typography variant={'bold_text_14'}>{comment.from.username}&nbsp;</Typography>
            {comment.content}
          </Typography>
          <div className={`${comment.answerCount ? 'mb-2' : 'mb-4'}`}>
            <Typography variant={'small_text'} className={'text-light-900 mr-3'}>
              {formatTimeAgo(comment.createdAt)}
            </Typography>
            <Typography variant={'semi_bold_small_text'} className={'text-light-900'}>
              {t('posts_likesLabel', { count: comment.likeCount })}
            </Typography>
          </div>
          <div>
            {comment.answerCount !== 0 && (
              <Typography
                onClick={() => viewAnswerHandler(comment.id)}
                variant={'semi_bold_small_text'}
                className={'text-light-900 mb-4 block cursor-pointer'}
              >
                &mdash; {t('posts_viewAnswers', { count: comment.answerCount })}
              </Typography>
            )}
            {data?.items.map(a => <PostAnswer key={a.id} answer={a} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostComment
