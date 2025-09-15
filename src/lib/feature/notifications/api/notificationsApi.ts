import { baseApi } from '@/lib/baseApi'
import { getNotificationResponse } from '@/lib/feature/notifications/api/notificationsApi.types'

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
      { isRead?: boolean; pageSize?: number; cursor?: number }
    >({
      query: params => ({
        url: '/notifications',
        params,
      }),
    }),
  }),
})

export const { useMarkAsReadMutation, useLazyGetNotificationsQuery } = notificationsApi
