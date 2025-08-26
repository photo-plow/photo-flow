import { baseApi } from '@/lib/baseApi'
import {
  createPaymentRequest,
  getCurrentSubscriptionResponse,
  GetMyPayments,
} from '@/lib/feature/subscriptions/api/subscriptionApi.types'

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createPayment: build.mutation<{ url: string }, createPaymentRequest>({
      query: body => ({
        url: '/subscriptions',
        method: 'POST',
        body,
      }),
    }),
    cancelSubscription: build.mutation<void, void>({
      query: () => ({
        url: '/subscriptions/canceled-auto-renewal',
        method: 'POST',
      }),
    }),
    renewAutoRenewal: build.mutation<void, void>({
      query: () => ({
        url: '/subscriptions/renew-auto-renewal',
        method: 'POST',
      }),
    }),
    getCurrentSubscription: build.query<getCurrentSubscriptionResponse, void>({
      query: () => '/subscriptions/current-payment-subscriptions',
    }),
    getMyPayments: build.query<GetMyPayments[], void>({
      query: () => '/subscriptions/my-payments',
    }),
  }),
})

export const {
  useCreatePaymentMutation,
  useGetCurrentSubscriptionQuery,
  useCancelSubscriptionMutation,
  useRenewAutoRenewalMutation,
  useGetMyPaymentsQuery,
} = subscriptionApi
