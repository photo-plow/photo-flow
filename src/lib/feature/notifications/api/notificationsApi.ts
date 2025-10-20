import { baseApi } from '@/lib/baseApi'
import { getNotificationResponse } from '@/lib/feature/notifications/api/notificationsApi.types'
import { PAGE_SIZE } from '@/constants'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: build => ({
    markAsRead: build.mutation<void, { ids: number[] }>({
      query: body => ({
        url: '/notifications/mark-as-read',
        method: 'PUT',
        body,
      }),
    }),
    getNotifications: build.query<
      getNotificationResponse,
      { cursor?: number; pageSize?: number; isRead?: boolean; sortBy?: string }
    >({
      query: ({ cursor, pageSize = PAGE_SIZE, isRead }) => {
        const params = new URLSearchParams()
        if (pageSize) params.append('pageSize', pageSize.toString())
        if (isRead !== undefined) params.append('isRead', String(isRead))
        params.append('sortBy', 'id')
        const path = cursor ? `/notifications/${cursor}` : `/notifications`

        return {
          url: `${path}?${params.toString()}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useMarkAsReadMutation, useLazyGetNotificationsQuery } = notificationsApi
