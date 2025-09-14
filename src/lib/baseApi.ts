import { baseQueryWithReauth } from '@/lib/baseQueryWithReauth'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: [],
  baseQuery: baseQueryWithReauth,

  endpoints: () => ({}),
})
