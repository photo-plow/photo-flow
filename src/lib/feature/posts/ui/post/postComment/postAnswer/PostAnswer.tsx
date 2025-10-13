'use client'

import Image from 'next/image'
import { Typography } from 'photo-flow-ui-kit'
import { formatTimeAgo } from '@/utils'
import { Answer } from '@/lib/feature/posts/api/postsApi.types'
import DefaultAvatar from '@/../public/defaultAvatar.jpg'
import { useTranslation } from 'react-i18next'

function PostAnswer({ answer }: { answer: Answer }) {
  const { t } = useTranslation()

  return (
    <div key={answer.id} className={'flex gap-3'}>
      <div className={'h-9 max-w-9'}>
        <Image
          width={36}
          height={36}
          src={answer.from.avatars[1].url || DefaultAvatar}
          className={'max-w-9 rounded-full'}
          alt={t('posts_commenter_imgAlt')}
        />
      </div>
      <div>
        <Typography variant={'regular_text_14'} className={'mb-1'}>
          <Typography variant={'bold_text_14'}>{answer.from.username}&nbsp;</Typography>
          {answer.content}
        </Typography>
        <div className={'mb-4'}>
          <Typography variant={'small_text'} className={'text-light-900 mr-3'}>
            {formatTimeAgo(answer.createdAt)}
          </Typography>
          <Typography variant={'semi_bold_small_text'} className={'text-light-900'}>
            {t('posts_likesLabel', { count: answer.likeCount })}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default PostAnswer
