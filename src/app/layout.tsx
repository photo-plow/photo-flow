'use client'

import './globals.css'
import React from 'react'
import { StoreProvider } from '@/app/StoreProvider'
import { AuthProvider } from '@/lib/feature/auth/ui/AuthProvider'
import { Content } from '@/app/Content'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <div id='alert-root' />
        <StoreProvider>
          <AuthProvider>
            <Content>{children}</Content>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
