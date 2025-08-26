import Image from 'next/image'
import { Typography } from 'photo-flow-ui-kit'
import { formatTimeAgo } from '@/utils'
import { PostResponse } from '@/lib/feature/posts/api/postsApi.types'
import DefaultAvatar from '@/../public/defaultAvatar.jpg'

function PostDescription({ post }: { post: PostResponse }) {
  return (
    <div className={'border-dark-100 mb-4 flex gap-3 border-b'}>
      <div className={'h-9 max-w-9'}>
        <Image
          width={36}
          height={36}
          src={post.avatarOwner || DefaultAvatar}
          className={'max-w-9 rounded-full'}
          alt={'photo of creator'}
        />
      </div>
      <div>
        <Typography variant={'regular_text_14'} className={'mb-1 max-w-[395px] break-words'}>
          <Typography variant={'bold_text_14'} className={'max-w-[395px]'}>
            {post.userName}&nbsp;
          </Typography>

          {post.description}
        </Typography>
        <div className={'mb-1'}>
          <Typography variant={'small_text'} className={'text-light-900 mr-3'}>
            {formatTimeAgo(post.createdAt)}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default PostDescription
