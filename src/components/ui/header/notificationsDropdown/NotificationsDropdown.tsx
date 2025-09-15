'use client'

import { twMerge } from 'tailwind-merge'
import Notifications from '@/assets/icons/Notifications.svg'
import { memo, useState } from 'react'
import { Card } from '@/components/ui/Card/Card'
import { Typography } from '@/components/ui/typography/Typography'
import { formatTimeAgo } from '@/utils'
import { Notification } from '@/lib/feature/notifications/api/notificationsApi.types'

type PropsType = {
  notifications: Notification[]
  marlAllRead: () => void
  unreadCount: number
  fetchNotifications: () => Promise<void>
}

export const NotificationsDropdown = memo(
  ({ notifications, unreadCount, fetchNotifications }: PropsType) => {
    const [isOpen, setIsOpen] = useState(false)

    const notificationsHandler = () => {
      if (!isOpen) {
        fetchNotifications()
      }
      setIsOpen(prev => !prev)
      // if (isOpen) {
      //   marlAllRead()
      // }
    }

    return (
      <div className={'relative'} onClick={notificationsHandler}>
        {unreadCount > 0 && (
          <div
            className={twMerge(
              'bg-danger-500 text-w absolute top-[-5px] right-[-5px] flex h-[13px] w-[13px] items-center justify-center rounded-[50%] font-medium',
              unreadCount > 9 ? 'text-[8px]' : 'text-[10px]',
              'cursor-default'
            )}
          >
            {unreadCount}
          </div>
        )}
        <Notifications className={'h-[20px] w-[18px] cursor-pointer fill-white'} />

        {isOpen && (
          <Card
            className={
              'bg-dark-500 border-dark-100 absolute right-0 w-[355px] rounded-[4px] border p-4 pr-1'
            }
          >
            <Typography variant={'regular_text_16'} className={'mb-3'}>
              Уведомления
            </Typography>
            <div className={'max-h-[356px] overflow-y-auto'}>
              {notifications.map(n => (
                <div key={n.id} className={'border-dark-100 mr-2 border-t py-3'}>
                  <Typography variant={'bold_text_14'}>Новое уведомление!</Typography>
                  {!n.isRead && (
                    <Typography variant={'small_text'} className={'text-accent-500 ml-1'}>
                      Новое
                    </Typography>
                  )}
                  <Typography variant={'regular_text_14'}>{n.message}</Typography>
                  <Typography variant={'small_text'} className={'text-light-900'}>
                    {formatTimeAgo(n.createdAt)}
                  </Typography>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    )
  }
)

NotificationsDropdown.displayName = 'NotificationsDropdown'
