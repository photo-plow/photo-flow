'use client'

import { useGetMeQuery } from '@/lib/feature/auth/api/authApi'
import { Button } from 'photo-flow-ui-kit'
import Link from 'next/link'

type Props = {
  id: string
}

export const ProfileControls = ({ id }: Props) => {
  const { data, isLoading, isFetching, error } = useGetMeQuery()

  if (error || isLoading || isFetching) return <></>

  if (data && data.userId !== Number(id)) {
    return (
      <div className='text-regular-16 flex gap-[12px]'>
        <Button variant='primary'>Follow</Button>
        <Button variant='secondary'>Send Message</Button>
      </div>
    )
  }
  return (
    <Button asChild className='w-[167px h-[36px]' variant='secondary'>
      <Link href={`/profile/${data?.userId}/ProfileSettings`}>Profile settings</Link>
    </Button>
  )
}
