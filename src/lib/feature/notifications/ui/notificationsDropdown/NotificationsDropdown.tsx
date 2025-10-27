'use client'

import { twMerge } from 'tailwind-merge'
import Notifications from '@/assets/icons/Notifications.svg'
import { memo, useCallback, useEffect, useState } from 'react'

import { formatTimeAgo } from '@/utils'
import { Card, Loader, Typography } from 'photo-flow-ui-kit'
import { useNotifications } from '@/hooks/useNotifications'

export const NotificationsDropdown = memo(() => {
  const {
    unreadCount,
    notifications,
    markAllRead,
    fetchNotifications,
    setObserver,
    isFetching,
    hasMoreNotifications,
  } = useNotifications()

  const [isOpen, setIsOpen] = useState(false)

  const notificationsHandler = () => {
    if (!isOpen) {
      fetchNotifications()
      markAllRead()
    }
    setIsOpen(prev => !prev)
  }

  const handleClose = useCallback(() => {
    setIsOpen(false)
    if (unreadCount > 0) {
      markAllRead()
    }
  }, [markAllRead, unreadCount])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector('.notifications-dropdown')
      if (dropdown && !dropdown.contains(event.target as Node)) {
        handleClose()
      }
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, markAllRead])

  return (
    <div className={'notifications-dropdown relative'}>
      <div className={'relative'} onClick={notificationsHandler}>
        {unreadCount > 0 && (
          <div
            className={twMerge(
              'bg-danger-500 text-w absolute top-[-5px] right-[-5px] flex h-[13px] w-[13px] items-center justify-center rounded-[50%] font-medium',
              unreadCount > 9 ? 'text-[8px]' : 'text-[10px]',
              'cursor-default'
            )}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
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
              {notifications.length === 0 && !isFetching ? (
                <Typography
                  variant={'regular_text_14'}
                  className={'text-light-900 py-4 text-center'}
                >
                  Нет уведомлений
                </Typography>
              ) : (
                <>
                  {notifications.map(n => (
                    <div key={n.id} className={'border-dark-100 mr-2 border-t py-3'}>
                      <Typography variant={'bold_text_14'}>Новое уведомление!</Typography>
                      {!n.isRead && (
                        <Typography variant={'small_text'} className={'text-accent-500 ml-1'}>
                          New
                        </Typography>
                      )}
                      <Typography variant={'regular_text_14'}>{n.message}</Typography>
                      <Typography variant={'small_text'} className={'text-light-900'}>
                        {formatTimeAgo(n.createdAt)}
                      </Typography>
                    </div>
                  ))}

                  {hasMoreNotifications && <div ref={setObserver} className={'h-10'}></div>}

                  {isFetching && (
                    <div className={'flex justify-center py-3'}>
                      <Loader />
                    </div>
                  )}

                  {!hasMoreNotifications && notifications.length > 0 && (
                    <Typography
                      variant={'small_text'}
                      className={'text-light-900 py-3 text-center'}
                    >
                      Вы просмотрели все уведомления
                    </Typography>
                  )}
                </>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
})

NotificationsDropdown.displayName = 'NotificationsDropdown'
