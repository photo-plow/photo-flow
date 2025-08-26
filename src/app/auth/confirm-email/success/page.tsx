'use client'
import { Typography } from 'photo-flow-ui-kit'
import { Button } from 'photo-flow-ui-kit'
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  return (
    <div className={'flex h-full w-full flex-col items-center'}>
      <Typography className={'mb-5'} variant={'h1'}>
        Congratulations!
      </Typography>
      <Typography className={'mb-[54px]'} variant={'regular_text_16'}>
        Your email has been confirmed
      </Typography>
      <Button className={'mb-18 w-[182px] text-center'} asChild>
        <Link href={'/auth/sign-in'}>
          <Typography variant={'h3'}>Sign In</Typography>
        </Link>
      </Button>
      <Image width={432} height={300} src={'/success-email.webp'} alt={'success email image'} />
    </div>
  )
}
