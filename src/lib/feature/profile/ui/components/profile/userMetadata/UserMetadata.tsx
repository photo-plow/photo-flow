'use client'

import { Typography } from 'photo-flow-ui-kit'

type Props = {
  title: string
  metaDataCount: number
  // variant?: 'followers' | 'following'
}

export const UserMetadata = ({ title, metaDataCount }: Props) => {
  // const showFollowers = () => {}
  // const showFollowing = () => {}

  return (
    <div className='cursor-pointer' onClick={() => {}}>
      <Typography variant='bold_text_14'>{metaDataCount}</Typography>
      <Typography variant='regular_text_14'>{title}</Typography>
    </div>
  )
}
