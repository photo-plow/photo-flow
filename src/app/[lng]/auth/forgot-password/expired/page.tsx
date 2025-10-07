import { Suspense } from 'react'
import ExpiredPasswordPage from '@/app/[lng]/auth/forgot-password/expired/ExpiredPassword'

export default function Page() {
  return (
    <Suspense>
      <ExpiredPasswordPage />
    </Suspense>
  )
}
