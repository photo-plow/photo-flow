export type Notification = {
  id: number
  message: string
  isRead: boolean
  createdAt: string
}

export type NotificationWS = {
  id: number
  clientId: string
  message: string
  isRead: boolean
  notifyAt: string
  createdAt: string
  eventType: number
}

export type getNotificationResponse = {
  pageSize: number
  totalCount: number
  notReadCount: number
  items: Notification[]
}
