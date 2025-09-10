// Глобальный mutex на случай одновременного 401
import { Mutex } from 'async-mutex'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AUTH_TOKEN } from '@/constants'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: 'include', // для отправки refresh токена из куки
  prepareHeaders: headers => {
    const token = localStorage.getItem(AUTH_TOKEN)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  // Ждем, если кто-то другой уже обновляет токен
  await mutex.waitForUnlock()

  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // Проверка, не занят ли уже mutex
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            url: '/auth/update-tokens',
            method: 'POST',
          },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          const newAccessToken = (refreshResult.data as { accessToken: string }).accessToken

          // Сохраняем в localStorage
          localStorage.setItem(AUTH_TOKEN, newAccessToken)

          // Повторяем оригинальный запрос
          result = await baseQuery(args, api, extraOptions)
        } else {
          // Обновление не удалось, чистим localStorage
          localStorage.removeItem(AUTH_TOKEN)
        }
      } finally {
        // Обязательно отпускаем mutex
        release()
      }
    } else {
      // Кто-то уже обновляет токен — ждем
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
