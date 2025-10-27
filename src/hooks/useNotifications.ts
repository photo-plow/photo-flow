import { io } from 'socket.io-client'
import { AUTH_TOKEN, PAGE_SIZE } from '@/constants'
import { useAppSelector } from '@/lib/hooks'
import { selectIsAuth } from '@/lib/appSlice'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  useLazyGetNotificationsQuery,
  useMarkAsReadMutation,
} from '@/lib/feature/notifications/api/notificationsApi'
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

  const [markAllAsRead] = useMarkAsReadMutation()
  const [getNotifications, { isFetching }] = useLazyGetNotificationsQuery()

  const observerRef = useRef<IntersectionObserver | null>(null)

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
      // console.log('WebSocket notification:', notification)

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
    async (reset: boolean = false) => {
      if (isFetching || (!reset && !hasMoreNotifications)) return
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
          setHasMoreNotifications(true)
        }
      } catch (e) {
        console.error('Ошибка загрузки уведомлений:', e)
        setHasMoreNotifications(false)
      } finally {
        // console.log('все уведомления прочитаны')
      }
    },
    [getNotifications, isFetching, hasMoreNotifications, cursor]
  )

  const markAllRead = useCallback(async () => {
    try {
      const unreadIds = notifications.filter(n => !n.isRead).map(n => n.id)

      if (unreadIds.length === 0) {
        setUnreadCount(0)
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
        return
      }
      await markAllAsRead({ ids: unreadIds }).unwrap()

      setNotifications(prev => prev.filter(n => !n.isRead))
      setUnreadCount(0)
      // console.log('Уведомления помечены как прочитанные')
    } catch (error) {
      console.error('Ошибка при пометке уведомлений как прочитанные:', error)
    }
  }, [notifications, markAllAsRead])

  const setObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return
      if (observerRef.current) observerRef.current.disconnect()

      observerRef.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMoreNotifications) {
            fetchNotifications(false)
          }
        },
        { threshold: 0.1 }
      )
      // Начинаем наблюдение за элементом
      if (node) {
        observerRef.current.observe(node)
      }
    },
    [isFetching, hasMoreNotifications, fetchNotifications]
  )
  // Сброс и первоначальная загрузка
  const loadInitialNotifications = useCallback(() => {
    setHasMoreNotifications(true)
    setCursor(undefined)
    fetchNotifications(true)
  }, [fetchNotifications])

  return {
    unreadCount,
    notifications,
    markAllRead,
    fetchNotifications: loadInitialNotifications,
    setObserver,
    isFetching,
    hasMoreNotifications,
  }
}
