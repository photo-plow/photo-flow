'use client'

import React from 'react'
import { Typography } from 'photo-flow-ui-kit'
import { Card } from 'photo-flow-ui-kit'

type CounterProps = {
  usersCount: number
}
export const UsersCounter = ({ usersCount }: CounterProps) => {
  const digits = String(usersCount)
  const paddedDigits = digits.length < 6 ? String(digits).padStart(6, '0') : digits
  return (
    <Card
      className={
        'flex items-center justify-between overflow-hidden' +
        ' h-[72px] w-[996px] px-[24px] py-[12px]'
      }
    >
      <Typography variant={'bold_text_16'}>Registered users:</Typography>

      <Card
        className={
          'h-[48px] w-[203px] ' +
          ' flex items-center justify-between overflow-hidden p-3' +
          ' bg-dark-700'
        }
      >
        {paddedDigits.split('').map((digit, index) => (
          <React.Fragment key={index}>
            <div className='text-lg font-bold'>{digit}</div>
            {index !== paddedDigits.length - 1 && (
              <div className='mx-[4px] h-[24px] w-[1px] bg-neutral-400 opacity-50' />
            )}
          </React.Fragment>
        ))}
      </Card>
    </Card>
  )
}
