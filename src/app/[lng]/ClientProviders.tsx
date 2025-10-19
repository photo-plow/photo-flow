'use client'

import React from 'react'

import { StoreProvider } from './StoreProvider'
import { Content } from './Content'
import { GlobalErrorAlert } from './GlobalErrorAlert'

import { AlertProvider } from 'photo-flow-ui-kit'

import { AuthProvider } from '@/lib/feature/auth/ui/AuthProvider'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <AlertProvider>
        <AuthProvider>
          <GlobalErrorAlert />
          <Content>{children}</Content>
        </AuthProvider>
      </AlertProvider>
    </StoreProvider>
  )
}
