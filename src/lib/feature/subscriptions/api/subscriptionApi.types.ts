export type createPaymentRequest = {
  typeSubscription: string
  paymentType: string
  amount: number
  baseUrl: string
}

export type Data = {
  userId: number
  subscriptionId: string
  dateOfPayment: string
  endDateOfSubscription: string
  autoRenewal: boolean
}

export type getCurrentSubscriptionResponse = {
  data: Data[]
  hasAutoRenewal: boolean
}

export type GetMyPayments = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD'
  price: number
  subscriptionId: string
  subscriptionType: 'DAY' | 'WEEKLY' | 'MONTHLY'
  userId: number
}
