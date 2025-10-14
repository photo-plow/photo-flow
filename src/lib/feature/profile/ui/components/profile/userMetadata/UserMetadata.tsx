'use client'

import { Typography } from 'photo-flow-ui-kit'

type Props = {
  title: string
  metaDataCount: number
}

export const UserMetadata = ({ title, metaDataCount }: Props) => {
  return (
    <div className='cursor-pointer' onClick={() => {}}>
      <Typography variant='bold_text_14'>{metaDataCount}</Typography>
      <Typography variant='regular_text_14'>{title}</Typography>
    </div>
  )
}
