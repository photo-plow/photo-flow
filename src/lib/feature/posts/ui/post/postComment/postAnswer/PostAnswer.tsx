import Image from 'next/image'
import { Typography } from 'photo-flow-ui-kit'
import { formatTimeAgo } from '@/utils'
import { Answer } from '@/lib/feature/posts/api/postsApi.types'
import DefaultAvatar from '@/../public/defaultAvatar.jpg'

function PostAnswer({ answer }: { answer: Answer }) {
  return (
    <div key={answer.id} className={'flex gap-3'}>
      <div className={'h-9 max-w-9'}>
        <Image
          width={36}
          height={36}
          src={answer.from.avatars[1].url || DefaultAvatar}
          className={'max-w-9 rounded-full'}
          alt={'user comment avatar'}
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
            Likes: {answer.likeCount}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default PostAnswer
