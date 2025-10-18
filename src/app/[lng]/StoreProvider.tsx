'use client'
import { Provider } from 'react-redux'
import { ReactNode, useEffect, useRef } from 'react'
import { makeStore, AppStore } from '@/lib/store'
import { setupListeners } from '@reduxjs/toolkit/query'

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }
  useEffect(() => {
    if (storeRef.current) {
      const unsubscribe = setupListeners(storeRef.current.dispatch)
      return unsubscribe
    }
  }, [])
  return <Provider store={storeRef.current}>{children}</Provider>
}
