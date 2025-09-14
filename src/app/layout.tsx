'use client'

import './globals.css'
import React from 'react'
import { StoreProvider } from '@/app/StoreProvider'
import { AuthProvider } from '@/lib/feature/auth/ui/AuthProvider'
import { Content } from '@/app/Content'
import { AlertProvider } from 'photo-flow-ui-kit'
import { GlobalErrorAlert } from '@/app/GlobalErrorAlert'

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
          <AlertProvider>
            <AuthProvider>
              <GlobalErrorAlert />
              <Content>{children}</Content>
            </AuthProvider>
          </AlertProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
