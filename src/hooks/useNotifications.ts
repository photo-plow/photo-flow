import { io } from 'socket.io-client'
import { AUTH_TOKEN, PAGE_SIZE } from '@/constants'
import { useAppSelector } from '@/lib/hooks'
import { selectIsAuth } from '@/lib/appSlice'
import { useCallback, useEffect, useState } from 'react'
import { useLazyGetNotificationsQuery } from '@/lib/feature/notifications/api/notificationsApi'
import {
  Notification,
  NotificationWS,
} from '@/lib/feature/notifications/api/notificationsApi.types'

export const useNotifications = () => {
  const isAuth = useAppSelector(selectIsAuth)
  const token = localStorage.getItem(AUTH_TOKEN)

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState<number>(0)
  const [cursor, setCursor] = useState<number | undefined>(undefined)
  const [hasMoreNotifications, setHasMoreNotifications] = useState(true)

  // const [markAllAsRead] = useMarkAsReadMutation()
  const [getNotifications, { isFetching }] = useLazyGetNotificationsQuery()

  // const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isAuth) return

    getNotifications({ isRead: false })
      .unwrap()
      .then(res => setUnreadCount(res.items.length))

    const socket = io('https://inctagram.work', {
      query: { accessToken: localStorage.getItem(AUTH_TOKEN) },
      transports: ['websocket'],
    })

    socket.on('notifications', (notification: NotificationWS) => {
      if (!notification.isRead) {
        setUnreadCount(prev => prev + 1)
      }

      const normalized: Notification = {
        id: notification.id,
        message: notification.message,
        isRead: notification.isRead,
        createdAt: notification.createdAt,
      }

      setNotifications(prev => [normalized, ...prev])
    })

    return () => {
      socket.disconnect()
    }
  }, [token, isAuth, getNotifications])

  const fetchNotifications = useCallback(
    async (reset: boolean) => {
      if (isFetching || !hasMoreNotifications) return
      try {
        const res = await getNotifications({
          pageSize: PAGE_SIZE,
          cursor: reset ? undefined : cursor,
        }).unwrap()

        setNotifications(prev => (reset ? res.items : [...prev, ...res.items]))

        if (res.items.length < PAGE_SIZE) {
          setHasMoreNotifications(false)
        } else {
          setCursor(res.items[res.items.length - 1].id)
        }
      } catch (e) {
        console.error(e)
      }
    },
    [getNotifications, isFetching, hasMoreNotifications, cursor]
  )

  const marlAllRead = useCallback(() => {
    // trigger()
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }, [])

  // const setObserver = useCallback((node: HTMLDivElement | null) => {
  //   if (isFetching) return
  //   if (observerRef.current) observerRef.current.disconnect?.()
  //
  //   const observer = new IntersectionObserver((entries, observer) => {
  //     if (entries[0].isIntersecting && hasMoreNotifications) {
  //       fetchNotifications(false)
  //     }
  //   })
  //
  //   if (node) {
  //     observer.observe(node)
  //   }
  //   observerRef.current = observer
  // }, [])

  return { unreadCount, notifications, marlAllRead, fetchNotifications }
}
